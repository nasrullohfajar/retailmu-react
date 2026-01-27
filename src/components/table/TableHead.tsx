import type { TableHeadProps } from "./types";
import { HiChevronUp, HiChevronDown, HiSelector } from "react-icons/hi";

const TableHead = <T extends Record<string, unknown>>({
  columns,
  sortBy,
  order,
  onSort,
  hasActions,
}: TableHeadProps<T>) => {
  return (
    <thead className="text-gray-500 text-left text-xs lg:text-sm">
      <tr className="border-y border-gray-200">
        <th className="w-14 py-4 px-3 text-center font-medium">No</th>

        {columns.map((col) => {
          const isSortable = col.sort !== false;
          const isCurrentSort = sortBy === col.data;

          return (
            <th
              key={String(col.data)}
              className={`py-4 px-3 font-medium select-none transition-colors ${
                isSortable ? "cursor-pointer hover:text-blue-600" : ""
              } ${col.className || ""}`}
              onClick={
                isSortable && onSort
                  ? () => onSort(String(col.data))
                  : undefined
              }
            >
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {col.title}
                </span>

                {isSortable && (
                  <span className="text-lg">
                    {!isCurrentSort ? (
                      <HiSelector className="text-gray-300" />
                    ) : order === "asc" ? (
                      <HiChevronUp className="text-blue-600" />
                    ) : (
                      <HiChevronDown className="text-blue-600" />
                    )}
                  </span>
                )}
              </div>
            </th>
          );
        })}

        {hasActions && (
          <th className="py-4 px-3 text-center font-medium">Aksi</th>
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
