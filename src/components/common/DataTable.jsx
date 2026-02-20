import React from "react";

const DataTable = ({ columns, data }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <table className="min-w-full overflow-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-5 py-3 text-left sm:px-6 text-gray-700 text-theme-sm dark:text-gray-200"
                >
                  {col?.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data?.length > 0 ? (
              data?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  {columns.map((col, colIndex) => {
                    const value = row[col.accessor];

                    return (
                      <td
                        key={colIndex}
                        className="px-5 py-4 sm:px-6  text-gray-700 text-theme-sm dark:text-gray-200"
                      >
                        {col.render ? (
                          col.render(value, row)
                        ) : (
                          <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                            {value}
                          </p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-5 text-gray-500"
                >
                  Data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
