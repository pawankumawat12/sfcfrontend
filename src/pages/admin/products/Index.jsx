import React, { useState, Activity } from "react";
import Image from "../../../components/ui/Image";
import DataTable from "../../../components/common/DataTable";
import { DeleteIcon, EditIcon, ViewIcon } from "../../../assets/svg/SvgIcons";
import Breadcrumb from "../../../components/ui/BreadCrumb";
import Button from "../../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import TablePagination from "../../../components/ui/TablePagination";
import { useGetProductsQuery } from "../../../redux/services/productApi";
import Loader from "../../../components/ui/Loader";
const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading } = useGetProductsQuery({
    page,
    limit,
  });
  const navigate = useNavigate();
  const productColumns = [
    {
      header: "Image",
      accessor: "thumbnail",
      render: (value) => (
        <Image
          src={value}
          alt="product"
          className="h-12 w-12 rounded-md object-cover"
        />
      ),
    },
    {
      header: "Product Name",
      accessor: "name",
    },
    {
      header: "Category",
      accessor: "category",
      render: (value) => value?.name || "-",
    },
    {
      header: "Price (₹)",
      accessor: "price",
    },
    {
      header: "Discount",
      accessor: "discountValue",
      render: (value, row) =>
        row.discountType ? `${value} (${row.discountType})` : "-",
    },
    {
      header: "SellingPrice",
      accessor: "sellingPrice",
    },
    {
      header: "Veg / Non-Veg",
      accessor: "productType",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Veg"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Stock",
      accessor: "stockStatus",
      render: (value, row) => {
        if (row.unlimitedStock) {
          return (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-green-700">
              Unlimited
            </span>
          );
        }
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {value ? "In Stock" : "Out of Stock"}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessor: "isActive",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <button
            className="text-gray-500 hover:text-blue-600"
            onClick={() => navigate(`/admin/products/show/${row?.slug}`)}
          >
            <ViewIcon />
          </button>
          <button className="text-gray-500 hover:text-green-600">
            <EditIcon />
          </button>
          <button className="text-gray-500 hover:text-red-600">
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Activity mode={loading ? "visible" : "hidden"}>
        <Loader />
      </Activity>
      <Breadcrumb pageTitle="Products" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-5 flex items-center justify-end gap-5">
          <Link to="/admin/products/create">
            <Button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              + Add Product
            </Button>
          </Link>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <DataTable columns={productColumns} data={data?.data || []} />{" "}
        </div>
      </div>
      {data && (
        <TablePagination
          page={page}
          perPage={limit}
          defaultPerPage={10}
          totalDocuments={data?.pagination?.total || 0}
          getNewData={(p) => setPage(p)}
          perPageChangeHandler={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        />
      )}
    </>
  );
};

export default Products;
