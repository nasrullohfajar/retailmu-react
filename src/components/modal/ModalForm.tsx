import type { ModalFormProps } from "./type";
import Button from "../button/Button";

const ModalForm = ({
  onSubmit,
  children,
  isLoading,
  className,
  handleCloseModal,
}: ModalFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-8 overflow-y-auto max-h-96 ${className}`}
    >
      {children}

      <div className="flex gap-2">
        <Button
          name="Batal"
          className="bg-gray-100 border border-gray-200 text-(--primary-color)! hover:bg-gray-200 px-6"
          handleClick={handleCloseModal}
        />

        <Button
          type="submit"
          name="Simpan"
          className="bg-blue-400 hover:bg-blue-500 px-6"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default ModalForm;
