import type { ModalFormProps } from "./type";
import Button from "../button/Button";

const ModalForm = ({
  onSubmit,
  children,
  isLoading,
  className,
  handleCloseModal,
  size = "sm",
}: ModalFormProps) => {
  const modalFormSize = {
    sm: "max-h-56 lg:max-h-72 xl:max-h-96 2xl:max-h-120 w-sm lg:w-md xl:w-lg 2xl:w-xl",
    lg: "max-h-56 lg:max-h-84 xl:max-h-110 2xl:max-h-160 w-sm lg:w-md xl:w-lg 2xl:w-xl",
  };
  const selectedSize = modalFormSize[size] || modalFormSize.sm;

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-4 xl:gap-8 overflow-y-auto p-2 ${selectedSize} ${className}`}
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
