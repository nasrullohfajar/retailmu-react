import type { ICategory } from "./types";
import { useState } from "react";
import Table from "../../../components/table/Table";
import {
  useGetCategories,
  useDeleteCategory,
  useGetCategoryById,
} from "./category.hook";
import InputSearch from "../../../components/input/InputSearch";
import { useTableParams } from "../../../hooks/useTableParams";
import { confirmDeleteAlert } from "../../../utils/sweetalert";
import CategoryForm from "./components/CategoryForm";
import PageLoader from "../../../components/loader/PageLoader";

const CategoryPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const table = useTableParams("createdAt");

  const { data, isLoading } = useGetCategories(
    table.page,
    table.search,
    table.sortBy,
    table.order,
  );

  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: detailData, isLoading: isLoadingDetail } = useGetCategoryById(
    id || "",
  );

  const columns = [
    { title: "Kode Kategori", data: "code", sort: true },
    { title: "Nama Kategori", data: "name", sort: true },
    { title: "Deskripsi", data: "description", sort: false },
  ];

  const handleAdd = () => {
    setId(null);
    setIsOpen(true);
  };

  const handleEdit = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  return (
    <Table<ICategory>
      id={id}
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
        confirmDeleteAlert("Kategori", () => deleteCategory(id))
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modal={
        isOpen && (
          <>
            {id && isLoadingDetail ? (
              <PageLoader />
            ) : (
              <CategoryForm
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

export default CategoryPage;
