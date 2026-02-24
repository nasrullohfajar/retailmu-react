import type { TableProps } from "./types";
import { FaPlus } from "react-icons/fa6";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import TableSkeleton from "./TableSkeleton";
import Modal from "../modal/Modal";

const Table = <T extends Record<string, unknown>>({
  isOpen,
  setIsOpen,
  data,
  isLoading,
  page,
  setPage,
  limit,
  columns,
  sortBy,
  order,
  onSort,
  onAdd,
  onEdit,
  onDetail,
  onDelete,
  filters,
  customHeaderButton,
  modal,
}: TableProps<T>) => {
  const hasActions = !!(onEdit || onDetail || onDelete);
  const totalColumns = columns.length + 1 + (hasActions ? 1 : 0);

  return (
    <div className="flex flex-col gap-y-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2 items-center">{filters}</div>

        <div className="flex gap-2 items-center ml-auto">
          {customHeaderButton}

          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 bg-(--primary-color) hover:bg-(--secondary-color) hover:cursor-pointer text-white px-6 py-2.5 xl:py-3 rounded text-xs lg:text-sm transition-all"
            >
              <FaPlus />
              <span>Tambah</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full text-sm text-left border-collapse table-fixed">
          <TableHead
            columns={columns}
            sortBy={sortBy}
            order={order}
            onSort={onSort}
            hasActions={!!(onEdit || onDetail || onDelete)}
          />

          {isLoading ? (
            <TableSkeleton columnCount={totalColumns} rowCount={10} />
          ) : !data || data?.data.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="py-20 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-medium text-xs lg:text-sm">
                      Data tidak ditemukan
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody
              data={data.data}
              page={page}
              limit={limit}
              columns={columns}
              onEdit={onEdit}
              onDetail={onDetail}
              onDelete={onDelete}
            />
          )}
        </table>
      </div>

      {isOpen && setIsOpen && (
        <Modal title={"Tambah"} setIsOpen={setIsOpen}>
          {modal}
        </Modal>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-xs lg:text-sm">
          Menampilkan {data?.data.length || 0} dari {data?.total || 0} data
        </p>

        <TablePagination
          page={page}
          setPage={setPage}
          totalPages={data?.pagination?.totalPages || 0}
        />
      </div>
    </div>
  );
};

export default Table;
