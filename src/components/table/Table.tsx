import type { TableProps } from "./types";
import { FaPlus } from "react-icons/fa6";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";

const Table = <T extends Record<string, unknown>>({
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
}: TableProps<T>) => {
  return (
    <div className="flex flex-col gap-y-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2 items-center">{filters}</div>

        <div className="flex gap-2 items-center ml-auto">
          {customHeaderButton}

          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              <FaPlus />
              <span>Tambah</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full text-sm text-left border-collapse">
          <TableHead
            columns={columns}
            sortBy={sortBy}
            order={order}
            onSort={onSort}
            hasActions={!!(onEdit || onDetail || onDelete)}
          />

          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={columns.length + 2} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500 font-medium">
                      Memuat data...
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : !data || data?.data.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="py-20 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-4xl">empty</span>
                    <p className="font-medium">Data tidak ditemukan</p>
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        <p className="font-semibold text-gray-700">
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
