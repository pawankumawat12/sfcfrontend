import React from "react";
import DataTable from "../../../../components/common/DataTable";
import {
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "../../../../assets/svg/SvgIcons";
import Image from "../../../../components/ui/Image";
import { categoryDummyData } from "../../../../constants/MenuItems";
import Breadcrumb from "../../../../components/ui/BreadCrumb";
import Button from "../../../../components/common/Button";
import { Link } from "react-router-dom";
export default function Category() {
  const categoryColumns = [
    {
      header: "Thumbnail",
      accessor: "thumbnail",
      render: (value) => (
        <Image
          src={value}
          alt="category"
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      header: "Category Name",
      accessor: "CategoryName",
    },
    {
      header: "Slug",
      accessor: "Slug",
    },
    {
      header: "Total Games",
      accessor: "TotalGames",
    },
    {
      header: "Status",
      accessor: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: "CreatedAt",
    },
    {
      header: "Actions",
      accessor: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-blue-600">
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
      <Breadcrumb pageTitle="Category" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-5 flex items-center justify-end gap-5">
          <Link to="">
            <Button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              + Add Category
            </Button>
          </Link>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <DataTable columns={categoryColumns} data={categoryDummyData} />
        </div>
      </div>
    </>
  );
}
