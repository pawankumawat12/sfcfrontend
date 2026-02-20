import React, { useEffect, useState, Activity } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../../../components/ui/Image";
import Button from "../../../../components/common/Button";
import Breadcrumb from "../../../../components/ui/BreadCrumb";
import DataTable from "../../../../components/common/DataTable";
import { DeleteIcon, EditIcon } from "../../../../assets/svg/SvgIcons";
import { useProductCategoryQuery } from "../../../../redux/services/productCategoryApi";
import Loader from "../../../../components/ui/Loader";

const Index = () => {
  const [categoryData, setCategoryData] = useState();
  const navigate = useNavigate();
  //get all api data

  const {
    data: productCategory,
    isLoading,
    isError,
    error,
  } = useProductCategoryQuery();

  console.log(productCategory, "Check frontend side se ok");

  useEffect(() => {
    setCategoryData(productCategory?.Categories);
  }, [productCategory]);

  //category tables columns
  const categoryColumns = [
    // {
    //   header: "Image",
    //   accessor: "image",
    //   render: (value) =>
    //     value?.url ? (
    //       <Image
    //         src={value.url}
    //         alt="category"
    //         className="h-12 w-12 rounded-md object-cover"
    //       />
    //     ) : (
    //       "—"
    //     ),
    // },
    {
      header: "Category Name",
      accessor: "name",
    },
    {
      header: "Parent Category",
      accessor: "parentCategory",
      render: (value) => value?.name || "—",
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value) => <span> {new Date(value).toLocaleString()}</span>,
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
      header: "Visibility",
      accessor: "visibility",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Button
            className="text-gray-500 hover:text-green-600"
            onClick={() => navigate(`/admin/category/edit/${row._id}`)}
          >
            <EditIcon />
          </Button>
          <Button className="text-gray-500 hover:text-red-600">
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Activity mode={isLoading ? "visible" : "hidden"}>
        <Loader />
      </Activity>
      <Breadcrumb pageTitle="Product Categories" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-5 flex items-center justify-end gap-5">
          <Link to="/admin/category/create">
            <Button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              + Add category
            </Button>
          </Link>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <DataTable columns={categoryColumns} data={categoryData} />
        </div>
      </div>
    </>
  );
};

export default Index;
