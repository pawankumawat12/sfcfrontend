import React, { useEffect, useState, Activity } from "react";
import Breadcrumb from "../../../../components/ui/BreadCrumb";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import CommonSelect from "../../../../components/common/Selector";
import { useForm, Controller } from "react-hook-form";
import Image from "../../../../components/ui/Image";
import {
  useEditProductCategoryApiMutation,
  useGetPorductCategoryApiQuery,
  useProductCategoryQuery,
} from "../../../../redux/services/productCategoryApi";
import { toast } from "react-toastify";
import Loader from "../../../../components/ui/Loader";
import { useParams, useNavigate } from "react-router-dom";
const Edit = () => {
  const [imagePreview, setImagePreview] = useState();
  const [categoryData, setCategoryData] = useState();
  const [categories, setCategories] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm();

  const {
    data: GetPorductCategoryApi,
    isLoading: isGetCategoryLoading,
    error,
    isError,
  } = useGetPorductCategoryApiQuery(id);

  const { data: ProductCategory } = useProductCategoryQuery();

  const [editProductCategoryApi, { isLoading: isEditCategoryLoading }] =
    useEditProductCategoryApiMutation();

  //edit function
  const EditSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.parentCategory) {
      formData.append("parentCategory", data.parentCategory);
    }
    formData.append("displayOrder", data.displayOrder || 0);
    formData.append("isActive", data.isActive === "true");
    formData.append("visibility", data.visibility ? "true" : "false");

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    try {
      const res = await editProductCategoryApi({ id, data: formData }).unwrap();
      if (res.success) {
        toast.success(res?.message);
        navigate("/product/category");
      }
    } catch (error) {
      console.error(error);
      if (error) {
        toast.error(error.data?.message);
      }
    }
  };

  useEffect(() => {
    setCategoryData(GetPorductCategoryApi?.Category);
  }, [GetPorductCategoryApi]);

  //set category to show into selectore
  useEffect(() => {
    let categories = ProductCategory?.Categories?.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setCategories(categories);
  }, [ProductCategory]);

  //show data from get by id api with reset method
  useEffect(() => {
    if (categoryData) {
      reset({
        name: categoryData.name,
        parentCategory: categoryData.parentCategory,
        displayOrder: categoryData.displayOrder,
        isActive: String(categoryData.isActive),
        visibility: categoryData.visibility,
      });
    }
  }, [categoryData, reset]);

  return (
    <>
      <Activity
        mode={
          isGetCategoryLoading || isEditCategoryLoading ? "visible" : "hidden"
        }
      >
        <Loader />
      </Activity>
      <Breadcrumb
        pageTitle="Product Categories"
        subTitle="edit"
        pagePath="/category"
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-7 text-lg font-semibold text-gray-800 dark:text-white/90">
          Edit category
        </h3>

        <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <form className="flex flex-col" onSubmit={handleSubmit(EditSubmit)}>
            {/* BASIC INFO */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Input
                type="text"
                label="Category Name"
                name="name"
                placeholder="Coffee / Tea / Snacks"
                {...register("name", { required: "Category name is required" })}
              />

              <Controller
                name="parentCategory"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    label="Parent Category"
                    placeholder="Select parent category"
                    options={categories}
                    value={categories?.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
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

              <Input
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

              {/* IMAGE PREVIEW */}
              {/* {imagePreview && ( */}
              <div className="mt-2">
                <Image
                  src={imagePreview ? imagePreview : categoryData?.image?.url}
                  alt="preview"
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
              {/* )} */}
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

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-brand-500"
                  {...register("visibility")}
                />
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  Show in menu
                </span>
              </label>
            </div>

            {/* SUBMIT */}
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                className="mt-6 rounded-lg bg-brand-500 px-6 py-2 text-sm font-medium text-white"
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
