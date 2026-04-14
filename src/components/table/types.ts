export interface Column<T> {
  title: string;
  data: keyof T | string;
  className?: string;
  sort?: boolean;
}

export interface TableBodyProps<T> {
  data: T[];
  page: number;
  limit: number;
  columns: Column<T>[];
  onEdit?: (id: string) => void;
  onDetail?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface TableHeadProps<T> {
  columns: Column<T>[];
  sortBy?: string;
  order?: "asc" | "desc";
  onSort?: (column: string) => void;
  hasActions?: boolean;
}

export interface TablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export interface TableDataProps<T> {
  data: T[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    totalPages: number;
  };
  total: number;
}

export interface TableProps<T> {
  id?: string | null;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  data?: TableDataProps<T>;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  columns: Column<T>[];
  sortBy?: string;
  order?: "asc" | "desc";
  onSort?: (column: string) => void;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDetail?: (id: string) => void;
  onDelete?: (id: string) => void;
  filters?: React.ReactNode;
  customHeaderButton?: React.ReactNode;
  modal?: React.ReactNode;
}
