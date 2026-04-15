export interface InputSearchProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface InputTextProps<T = HTMLInputElement> {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string | number | string[];
  onChange: (e: React.ChangeEvent<T>) => void;
  icon?: React.ReactNode;
  secret?: boolean;
  required?: boolean;
  className?: string;
  formClassname?: string;
  labelClassName?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  decimal?: boolean;
  errorNoLabel?: boolean;
}
