import type { IStorage } from "./types";
import { useState } from "react";
import Table from "../../../components/table/Table";
import {
  useGetStorages,
  useDeleteStorage,
  useGetStorageById,
} from "./storage.hook";
import InputSearch from "../../../components/input/InputSearch";
import { useTableParams } from "../../../hooks/useTableParams";
import { confirmDeleteAlert } from "../../../utils/sweetalert";
import StorageForm from "./components/StorageForm";

const StoragePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const table = useTableParams("createdAt");

  const { data, isLoading } = useGetStorages(
    table.page,
    table.search,
    table.sortBy,
    table.order,
  );

  const { mutate: deleteCategory } = useDeleteStorage();
  const { data: detailData, isLoading: isLoadingDetail } = useGetStorageById(
    id || "",
  );

  const columns = [
    { title: "Kode Penyimpanan", data: "code", sort: true },
    { title: "Deskripsi", data: "description", sort: false },
  ];

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleEdit = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  return (
    <Table<IStorage>
      data={data}
      isLoading={isLoading}
      columns={columns}
      {...table}
      limit={10}
      filters={
        <InputSearch
          setPage={table.setPage}
          setSearch={table.setSearch}
          searchInput={table.searchInput}
          setSearchInput={table.setSearchInput}
        />
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={(id) =>
        confirmDeleteAlert("Penyimpanan", () => deleteCategory(id))
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modal={
        isOpen && (
          <>
            {id && isLoadingDetail ? (
              <div>Loading...</div>
            ) : (
              <StorageForm
                key={id ?? "new"}
                setIsOpen={setIsOpen}
                id={id}
                initialData={detailData?.data}
                isLoadingDetail={isLoadingDetail}
              />
            )}
          </>
        )
      }
    />
  );
};

export default StoragePage;
