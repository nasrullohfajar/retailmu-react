import { useState } from "react";
import { useCreateStorage, useUpdateStorage } from "../storage.hook";
import { InputText } from "../../../../components/input";
import ModalForm from "../../../../components/modal/ModalForm";

interface StorageFormProps {
  setIsOpen: (open: boolean) => void;
  id?: string | null;
  initialData?: { code: string; description: string };
  isLoadingDetail?: boolean;
}

const StorageForm = ({
  setIsOpen,
  id,
  initialData,
  isLoadingDetail,
}: StorageFormProps) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    description: initialData?.description || "",
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateStorage();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateStorage();

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
        label="Kode Penyimpanan"
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Masukkan kode penyimpanan"
        disabled={!!id}
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

export default StorageForm;
