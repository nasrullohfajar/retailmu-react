import type { ModalProps } from "./type";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Modal = ({ title, children, setIsOpen }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-1060 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-sm lg:w-lg xl:w-xl bg-white p-8 rounded-xl border border-gray-200"
      >
        <div className="flex justify-between mb-8">
          <p className="text-base lg:text-lg font-medium">{title}</p>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={24} className="text-red-700" />
          </button>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
