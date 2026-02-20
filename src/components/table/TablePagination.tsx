import { useMemo } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import type { TablePaginationProps } from "./types";

const TablePagination = ({
  page,
  setPage,
  totalPages,
}: TablePaginationProps) => {
  const pages = useMemo(() => {
    const p: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) p.push(i);
    } else {
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) p.push(i);
      } else {
        p.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return p;
  }, [page, totalPages]);

  return (
    <div className="flex items-center gap-1 text-sm select-none">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="p-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Previous Page"
      >
        <BiChevronLeft size={24} />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-3 py-1 text-gray-400">
              {p}
            </span>
          ) : (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => setPage(Number(p))}
              className={`min-w-8 h-8 px-3 py-1 rounded-md text-xs lg:text-sm font-medium transition-all ${
                p === page
                  ? "bg-(--primary-color) text-white shadow-sm shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="p-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Next Page"
      >
        <BiChevronRight size={24} />
      </button>
    </div>
  );
};

export default TablePagination;
