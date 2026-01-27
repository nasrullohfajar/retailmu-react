import { useState, useEffect } from "react";
import Table from "../../../../components/table/Table";
import { useGetCategories, useDeleteCategory } from "../hooks/useCategory";
import type { ICategory } from "../types/category";
import InputSearch from "../../../../components/input/InputSearch";
import Swal from "sweetalert2";

const CategoryPage = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading } = useGetCategories(page, search, sortBy, order);
  const { mutate: deleteCategory } = useDeleteCategory();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
    setPage(1);
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "Hapus Kategori?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#60A5FA",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) deleteCategory(id);
    });
  };

  const columns = [
    { title: "Nama Kategori", data: "name", sort: true },
    { title: "Deskripsi", data: "description", sort: false },
  ];

  return (
    <Table<ICategory>
      data={data?.categories}
      total={data?.total || 0}
      totalPages={data?.pagination?.totalPages || 1}
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      limit={10}
      sortBy={sortBy}
      order={order}
      onSort={handleSort}
      onDelete={confirmDelete}
      columns={columns}
      filters={
        <InputSearch
          setPage={setPage}
          setSearch={setSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      }
    />
  );
};

export default CategoryPage;
