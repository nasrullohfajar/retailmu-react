import type { TableBodyProps } from "./types";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ButtonAction from "../button/ButtonAction";

const TableBody = <T extends Record<string, unknown>>({
  data,
  page,
  limit,
  columns,
  onEdit,
  onDetail,
  onDelete,
}: TableBodyProps<T>) => {
  const getNestedValue = (
    obj: Record<string, unknown>,
    path: string,
  ): unknown => {
    return path.split(".").reduce((acc, key) => {
      if (acc && typeof acc === "object") {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj as unknown);
  };

  return (
    <tbody>
      {data.map((item, idx) => {
        const itemId = String(item._id || item.id || "");

        return (
          <tr
            key={itemId || idx}
            className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <td className="text-center py-4 px-3">
              {idx + 1 + (page - 1) * limit}
            </td>

            {columns.map((col) => {
              const value = getNestedValue(
                item as Record<string, unknown>,
                col.data as string,
              );

              return (
                <td
                  key={String(col.data)}
                  className={`py-4 px-3 truncate capitalize ${col.className}`}
                >
                  {value !== undefined && value !== null && value !== ""
                    ? String(value)
                    : "-"}
                </td>
              );
            })}

            {(onEdit || onDetail || onDelete) && (
              <td className="p-3">
                <div className="flex gap-2 justify-center">
                  {onDetail && (
                    <ButtonAction
                      icon={<MdRemoveRedEye />}
                      handleClick={() => onDetail(itemId)}
                      className="bg-blue-400 hover:bg-blue-500"
                    />
                  )}
                  {onEdit && (
                    <ButtonAction
                      icon={<MdEdit />}
                      handleClick={() => onEdit(itemId)}
                      className="bg-amber-400 hover:bg-amber-500"
                    />
                  )}
                  {onDelete && (
                    <ButtonAction
                      icon={<FaTrash />}
                      handleClick={() => onDelete(itemId)}
                      className="bg-red-400 hover:bg-red-500"
                    />
                  )}
                </div>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
