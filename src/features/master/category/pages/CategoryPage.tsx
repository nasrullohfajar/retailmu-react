import Table from "../../../../components/table/Table";
import { useGetCategories, useDeleteCategory } from "../hooks/useCategory";
import type { ICategory } from "../types/category";
import InputSearch from "../../../../components/input/InputSearch";
import { useTableParams } from "../../../../hooks/useTableParams";
import { confirmDeleteAlert } from "../../../../utils/sweetalert";

const CategoryPage = () => {
  const table = useTableParams("createdBy");

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
    />
  );
};

export default CategoryPage;
