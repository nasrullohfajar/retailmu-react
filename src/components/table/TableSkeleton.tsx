interface TableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

const TableSkeleton = ({ columnCount, rowCount = 5 }: TableSkeletonProps) => {
  return (
    <tbody>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-gray-100">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <td key={colIndex} className="py-4 px-3">
              <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
