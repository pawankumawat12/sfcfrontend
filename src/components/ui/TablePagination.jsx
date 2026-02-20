import React from "react";
import ReactPaginate from "react-paginate";

const TablePagination = ({
  page,
  totalDocuments,
  perPage,
  defaultPerPage,
  getNewData,
  perPageChangeHandler,
}) => {
  const start = Math.min(totalDocuments, perPage * (page - 1) + 1);
  const end = Math.min(totalDocuments, perPage * page);
  const pageCount = Math.ceil(totalDocuments / perPage);

  return (
    <div className="flex flex-wrap items-center mt-4">
      {/* Info */}
      <div className="w-full md:w-5/12">
        <div className="text-sm text-gray-600">
          Showing {start} to {end} of {totalDocuments} entries
        </div>
      </div>

      {/* Controls */}
      <div className="w-full md:w-7/12 flex justify-end items-center space-x-4 mt-2 md:mt-0">
        {/* Per Page */}
        <div>
          <label className="text-sm text-gray-500 flex items-center">
            Show&nbsp;
            <select
              onChange={perPageChangeHandler}
              defaultValue={defaultPerPage}
              className="ml-2 border border-gray-500 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={defaultPerPage}>Default</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>

        {/* Pagination */}
        <ReactPaginate
          forcePage={page - 1}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          onPageChange={(e) => getNewData(e.selected + 1)}
          containerClassName="flex space-x-1"
          pageClassName="inline-flex"
          pageLinkClassName="px-3 py-1 border border-gray-500 rounded-md text-sm text-gray-500 hover:bg-gray-100"
          previousClassName="inline-flex text-gray-500"
          previousLinkClassName="px-3 py-1 border border-gray-500 rounded-md text-sm hover:bg-gray-100"
          nextClassName="inline-flex text-gray-500"
          nextLinkClassName="px-3 py-1 border border-gray-500 rounded-md text-sm hover:bg-gray-100"
          breakClassName="inline-flex "
          breakLinkClassName="px-3 py-1 border border-gray-300 rounded-md text-sm"
          activeLinkClassName="bg-blue-500 text-white border-blue-500"
        />
      </div>
    </div>
  );
};

export default TablePagination;
