import type { ICategory } from "../types/category";
import { useState } from "react";
import Table from "../../../../components/table/Table";
import { useGetCategories, useDeleteCategory } from "../hooks/useCategory";
import InputSearch from "../../../../components/input/InputSearch";
import { useTableParams } from "../../../../hooks/useTableParams";
import { confirmDeleteAlert } from "../../../../utils/sweetalert";
import CategoryForm from "../components/CategoryForm";

const CategoryPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const table = useTableParams("createdAt");

  const { data, isLoading } = useGetCategories(
    table.page,
    table.search,
    table.sortBy,
    table.order,
  );

  const { mutate: deleteCategory } = useDeleteCategory();

  const columns = [
    { title: "Nama Kategori", data: "name", sort: true },
    { title: "Deskripsi", data: "description", sort: false },
  ];

  const handleAdd = () => {
    setIsOpen(true);
  };

  return (
    <Table<ICategory>
      data={data}
      isLoading={isLoading}
      columns={columns}
      {...table}
      limit={10}
      onDelete={(id) =>
        confirmDeleteAlert("Kategori", () => deleteCategory(id))
      }
      filters={
        <InputSearch
          setPage={table.setPage}
          setSearch={table.setSearch}
          searchInput={table.searchInput}
          setSearchInput={table.setSearchInput}
        />
      }
      onAdd={handleAdd}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modal={<CategoryForm setIsOpen={setIsOpen} />}
    />
  );
};

export default CategoryPage;
