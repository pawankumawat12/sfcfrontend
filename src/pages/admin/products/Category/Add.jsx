import React, { Activity, useEffect, useState } from "react";
import Breadcrumb from "../../../../components/ui/BreadCrumb";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import CommonSelect from "../../../../components/common/Selector";
import {
  useCreateProductCategoryMutation,
  useProductCategoryQuery,
} from "../../../../redux/services/productCategoryApi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Image from "../../../../components/ui/Image";
import Loader from "../../../../components/ui/Loader";

const Add = () => {
  const [categoryData, setCategoryData] = useState([]);
  // const [imagePreview, setImagePreview] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      isActive: "true",
    },
  });
  //get all categories

  const {
    data: productCategory,
    isLoading,
    isError,
    error,
  } = useProductCategoryQuery();


  
  const [CreateProductCategory, { loading }] =
    useCreateProductCategoryMutation();

  const AddCategorySubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.parentCategory && data.parentCategory !== "") {
      formData.append("parentCategory", data.parentCategory);
    }
    formData.append("displayOrder", data.displayOrder || 0);
    formData.append("isActive", data.isActive === "true");
    formData.append("visibility", data.visibility || false);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await CreateProductCategory(formData).unwrap();
      if (res.success) {
        toast.success(res?.message);
        navigate("/admin/category");
      }
    } catch (err) {
      console.error(err);
      if (err) {
        toast.error(err.data?.message);
      }
    }
  };

  useEffect(() => {
    if (!productCategory?.Categories?.length) return;
    const categories = [...productCategory.Categories]
    .sort((a, b) => a.level - b.level)
    .map((item) => ({
      value: item._id,
      label: `${"— ".repeat(item.level)} ${item.name}`,
    }));

    setCategoryData([
      { value: "", label: "None (Top Level Category)" },
      ...categories,
    ]);
  }, [productCategory]);

  const showLoader = isSubmitting || isLoading || loading;

  return (
    <>
      <Activity mode={showLoader ? "visible" : "hidden"}>
        <Loader />
      </Activity>
      <Breadcrumb
        pageTitle="Product Categories"
        subTitle="add"
        pagePath="/admin/category"
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-7 text-lg font-semibold text-gray-800 dark:text-white/90">
          Add new category
        </h3>

        <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(AddCategorySubmit)}
          >
            {/* BASIC INFO */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Input
                type="text"
                label="Category Name"
                name="name"
                placeholder="Coffee / Tea / Snacks"
                {...register("name", { required: "Name is required" })}
                error={errors.name?.message}
              />
              <Controller
                name="parentCategory"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    label="Parent Category"
                    placeholder="Select parent category"
                    options={categoryData || []}
                    value={categoryData?.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption?.value);
                    }}
                  />
                )}
              />

              <Input
                type="number"
                label="Display Order"
                name="displayOrder"
                placeholder="0"
                {...register("displayOrder")}
              />

              {/* <Input
                type="file"
                label="Category Image"
                name="image"
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    }
                  },
                })}
              />

              <Activity mode={imagePreview ? "visible" : "hidden"}>
                <Image
                  src={imagePreview ?? ""}
                  className="rounded-full h-20 w-20"
                />
              </Activity> */}
            </div>

            {/* STATUS */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                Category Status
              </p>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="true"
                    className="accent-green-600"
                    {...register("isActive")}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    Active
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="false"
                    className="accent-red-600"
                    {...register("isActive")}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    Inactive
                  </span>
                </label>
              </div>
            </div>

            {/* VISIBILITY */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                Visibility
              </p>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="showInMenu"
                    className="accent-brand-500"
                    {...register("visibility")}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    Show in menu
                  </span>
                </label>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                className="mt-6 rounded-lg bg-brand-500 px-6 py-2 text-sm font-medium text-white hover:bg-brand-600"
              >
                {isSubmitting ? "Adding" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
