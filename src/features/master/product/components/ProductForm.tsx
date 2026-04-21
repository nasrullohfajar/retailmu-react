import type { IProduct } from "../types";
import { useState } from "react";
import { useCreateProduct, useUpdateProduct } from "../product.hook";
import { InputText, InputSelect } from "../../../../components/input";
import ModalForm from "../../../../components/modal/ModalForm";
import { useGetCategories } from "../../category/category.hook";
import { useGetStorages } from "../../storage/storage.hook";

interface ProductFormProps {
  setIsOpen: (open: boolean) => void;
  id?: string | null;
  initialData?: IProduct;
  isLoadingDetail?: boolean;
}

const ProductForm = ({
  setIsOpen,
  id,
  initialData,
  isLoadingDetail,
}: ProductFormProps) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    name: initialData?.name || "",
    category: initialData?.category?._id || "",
    price: initialData?.price || 0,
    storage: initialData?.storage?._id || "",
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateProduct();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateProduct();

  const { data: categoryData } = useGetCategories(1, "", "name", "asc");
  const { data: storageData } = useGetStorages(1, "", "name", "asc");

  const categoryOptions =
    categoryData?.data.map((category) => ({
      value: category._id,
      label: category.name,
    })) || [];

  const storageOptions =
    storageData?.data.map((storage) => ({
      value: storage._id,
      label: storage.code,
    })) || [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      updateCategory(
        { id: id, payload: formData },
        { onSuccess: () => setIsOpen(false) },
      );
    } else {
      createCategory(formData, {
        onSuccess: () => setIsOpen(false),
      });
    }
  };

  return (
    <ModalForm
      isLoading={isCreating || isUpdating || isLoadingDetail}
      onSubmit={handleSubmit}
      setIsOpen={setIsOpen}
      handleCloseModal={() => setIsOpen(false)}
      size="lg"
    >
      <InputText
        label="Kode Produk"
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Contoh: IDMAB"
        required
      />

      <InputText
        label="Nama Produk"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Contoh: Indomie Ayam Bawang"
        required
      />

      <InputSelect
        label="Kategori"
        name="category"
        value={formData.category}
        options={categoryOptions}
        onChange={handleChange}
        required
      />

      <InputText
        type="number"
        label="Harga"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <InputSelect
        label="Penyimpanan"
        name="storage"
        value={formData.storage}
        options={storageOptions}
        onChange={handleChange}
      />
    </ModalForm>
  );
};

export default ProductForm;
