import React from "react";
import { gameDummyData } from "../../../constants/MenuItems";
import Image from "../../../components/ui/Image";
import DataTable from "../../../components/common/DataTable";
import { DeleteIcon, EditIcon, ViewIcon } from "../../../assets/svg/SvgIcons";
import Breadcrumb from '../../../components/ui/BreadCrumb';
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
const Games = () => {
  const gameColumns = [
    {
      header: "Thumbnail",
      accessor: "thumbnail",
      render: (value) => (
        <Image
          src={value}
          alt="game"
          className="h-12 w-12 rounded-md object-cover"
        />
      ),
    },
    {
      header: "Game Name",
      accessor: "name",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Featured",
      accessor: "featured",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
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
      <Breadcrumb pageTitle="Games" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-5 flex items-center justify-end gap-5">
          <Link to="/games/create">
            <Button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              + Add Game
            </Button>
          </Link>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <DataTable columns={gameColumns} data={gameDummyData} />
        </div>
      </div>
    </>
  );
};

export default Games;
