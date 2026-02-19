import { useState, useEffect } from "react";

export const useTableParams = (
  defaultSort = "createdAt",
  defaultOrder: "asc" | "desc" = "desc",
) => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(defaultSort);
  const [order, setOrder] = useState<"asc" | "desc">(defaultOrder);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  const onSort = (column: string) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
    setPage(1);
  };

  return {
    page,
    search,
    sortBy,
    order,
    setPage,
    searchInput,
    setSearchInput,
    setSearch,
    onSort,
  };
};
