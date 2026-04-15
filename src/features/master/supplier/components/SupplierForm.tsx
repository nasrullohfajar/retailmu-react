import { useState } from "react";
import { useCreateSupplier, useUpdateSupplier } from "../supplier.hook";
import { InputText, InputTextArea } from "../../../../components/input";
import ModalForm from "../../../../components/modal/ModalForm";

interface SupplierFormProps {
  setIsOpen: (open: boolean) => void;
  id?: string | null;
  initialData?: {
    code: string;
    name: string;
    pic: string;
    phone: string;
    address: string;
  };
  isLoadingDetail?: boolean;
}

const SupplierForm = ({
  setIsOpen,
  id,
  initialData,
  isLoadingDetail,
}: SupplierFormProps) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    name: initialData?.name || "",
    pic: initialData?.pic || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateSupplier();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateSupplier();

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
      handleCloseModal={() => setIsOpen(false)}
      size="lg"
    >
      <InputText
        label="Kode Supplier"
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Contoh: TS"
      />

      <InputText
        label="Nama Supplier"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Contoh: Toko Sejahtera"
      />

      <InputText
        label="PIC Supplier"
        name="pic"
        value={formData.pic}
        onChange={handleChange}
      />

      <InputText
        label="Telepon Supplier"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Contoh: 08xx"
      />

      <InputTextArea
        label="Alamat Supplier"
        name="address"
        value={formData.address}
        onChange={handleChange}
        labelClassName="resize-none"
      />
    </ModalForm>
  );
};

export default SupplierForm;
