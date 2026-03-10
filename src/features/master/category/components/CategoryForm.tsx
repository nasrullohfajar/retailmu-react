import { useState } from "react";
import { useCreateCategory, useUpdateCategory } from "../hooks/useCategory";
import { InputText } from "../../../../components/input";
import ModalForm from "../../../../components/modal/ModalForm";

interface CategoryFormProps {
  setIsOpen: (open: boolean) => void;
  id?: string | null;
  initialData?: { code: string; name: string; description: string };
  isLoadingDetail?: boolean;
}

const CategoryForm = ({
  setIsOpen,
  id,
  initialData,
  isLoadingDetail,
}: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    >
      <InputText
        label="Kode Kategori"
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Masukkan kode kategori"
        disabled={!!id}
      />

      <InputText
        label="Nama Kategori"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Masukkan nama kategori"
      />

      <InputText
        label="Deskripsi"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Masukkan deskripsi"
      />
    </ModalForm>
  );
};

export default CategoryForm;
