export interface ModalProps {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export interface ModalFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  setIsOpen: (open: boolean) => void;
  isLoading: boolean;
  className?: string;
  handleCloseModal?: () => void;
}
