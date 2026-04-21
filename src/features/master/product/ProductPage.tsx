import type { IProduct } from "./types";
import { useState } from "react";
import Table from "../../../components/table/Table";
import {
  useGetProducts,
  useGetProductById,
  useDeleteProduct,
} from "./product.hook";
import InputSearch from "../../../components/input/InputSearch";
import { useTableParams } from "../../../hooks/useTableParams";
import { confirmDeleteAlert } from "../../../utils/sweetalert";
import ProductForm from "./components/ProductForm";

const ProductPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const table = useTableParams("createdAt");

  const { data, isLoading } = useGetProducts(
    table.page,
    table.search,
    table.sortBy,
    table.order,
  );

  const { mutate: deleteCategory } = useDeleteProduct();
  const { data: detailData, isLoading: isLoadingDetail } = useGetProductById(
    id || "",
  );

  const columns = [
    { title: "Kode Produk", data: "code", sort: true },
    { title: "Nama Produk", data: "name", sort: true },
    { title: "Kategori", data: "category.name", sort: true },
    { title: "Harga", data: "price", sort: true },
    { title: "Penyimpanan", data: "storage.code", sort: true },
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
    <Table<IProduct>
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
      onDelete={(id) => confirmDeleteAlert("Produk", () => deleteCategory(id))}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modal={
        isOpen && (
          <>
            {id && isLoadingDetail ? (
              <div>Loading...</div>
            ) : (
              <ProductForm
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

export default ProductPage;
