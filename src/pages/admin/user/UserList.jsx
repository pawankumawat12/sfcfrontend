import React, { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import Breadcrumb from "../../../components/ui/BreadCrumb";
import TablePagination from "../../../components/ui/TablePagination";
import Button from "../../../components/common/Button";

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState("subadmins");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ---------------- DUMMY DATA ----------------
  const subadminsData = [
    {
      _id: 1,
      name: "John Admin",
      email: "john@mail.com",
      phone: "9999999999",
      isActive: true,
    },
    {
      _id: 2,
      name: "Alice Admin",
      email: "alice@mail.com",
      phone: "8888888888",
      isActive: false,
    },
  ];

  const restroOwnersData = [
    {
      _id: 1,
      name: "Pizza Owner",
      email: "pizza@mail.com",
      phone: "7777777777",
      isActive: true,
    },
    {
      _id: 2,
      name: "Burger Owner",
      email: "burger@mail.com",
      phone: "6666666666",
      isActive: true,
    },
  ];

  const usersData = [
    {
      _id: 1,
      name: "Rahul User",
      email: "rahul@mail.com",
      phone: "5555555555",
      isActive: true,
    },
    {
      _id: 2,
      name: "Sneha User",
      email: "sneha@mail.com",
      phone: "4444444444",
      isActive: false,
    },
  ];

  const currentData =
    activeTab === "subadmins"
      ? subadminsData
      : activeTab === "restro"
      ? restroOwnersData
      : usersData;

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Phone",
      accessor: "phone",
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
      render: () => (
        <div className="flex gap-3">
          <button className="text-blue-600">View</button>
          <button className="text-green-600">Edit</button>
          <button className="text-red-600">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb pageTitle="User Management" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Tabs */}
        <div className="mb-5 flex items-center justify-between gap-5 align-baseline">
          <div className="flex gap-4">
            {[
              { label: "Subadmins", value: "subadmins" },
              { label: "Restro Owners", value: "restro" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === tab.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Add Button */}
          <div className="flex justify-end mb-4">
            <Button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              + Add {activeTab}
            </Button>
          </div>
        </div>

        {/* Table */}
        <DataTable columns={columns} data={currentData} />
      </div>

      {/* Dummy Pagination */}
      <TablePagination
        page={page}
        perPage={limit}
        defaultPerPage={10}
        totalDocuments={currentData.length}
        getNewData={(p) => setPage(p)}
        perPageChangeHandler={(e) => {
          setLimit(Number(e.target.value));
          setPage(1);
        }}
      />
    </>
  );
};

export default UsersManagement;
