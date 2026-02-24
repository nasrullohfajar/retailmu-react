import { useState } from "react";
import { useCreateCategory } from "../hooks/useCategory";
import { InputText } from "../../../../components/input";
import ModalForm from "../../../../components/modal/ModalForm";

interface CategoryFormProps {
  setIsOpen: (open: boolean) => void;
}

const CategoryForm = ({ setIsOpen }: CategoryFormProps) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { mutate: createCategory, isPending } = useCreateCategory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCategory(formData, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <ModalForm
      isLoading={isPending}
      onSubmit={handleSubmit}
      setIsOpen={setIsOpen}
    >
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
