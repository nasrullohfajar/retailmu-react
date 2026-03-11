import type { ISupplier } from "./types";
import { useState } from "react";
import Table from "../../../components/table/Table";
import {
  useGetSuppliers,
  useGetSupplierById,
  useDeleteSupplier,
} from "./supplier.hook";
import InputSearch from "../../../components/input/InputSearch";
import { useTableParams } from "../../../hooks/useTableParams";
import { confirmDeleteAlert } from "../../../utils/sweetalert";
import SupplierForm from "./components/SupplierForm";

const SupplierPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const table = useTableParams("createdAt");

  const { data, isLoading } = useGetSuppliers(
    table.page,
    table.search,
    table.sortBy,
    table.order,
  );

  const { mutate: deleteSupplier } = useDeleteSupplier();
  const { data: detailData, isLoading: isLoadingDetail } = useGetSupplierById(
    id || "",
  );

  const columns = [
    { title: "Kode Supplier", data: "code", sort: true },
    { title: "Nama Supplier", data: "name", sort: true },
    { title: "PIC", data: "pic", sort: false },
    { title: "Telepon", data: "phone", sort: false },
    { title: "Alamat", data: "address", sort: false },
  ];

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleEdit = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  return (
    <Table<ISupplier>
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
        confirmDeleteAlert("Supplier", () => deleteSupplier(id))
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modal={
        isOpen && (
          <>
            {id && isLoadingDetail ? (
              <div>Loading...</div>
            ) : (
              <SupplierForm
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

export default SupplierPage;
