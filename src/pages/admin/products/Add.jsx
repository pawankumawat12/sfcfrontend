import React, { useState } from "react";
import Breadcrumb from "../../../components/ui/BreadCrumb";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import CommonSelect from "../../../components/common/Selector";
import { useCreateProductMutation } from "../../../redux/services/productApi";
import { Controller, useForm } from "react-hook-form";
import {
  useGetChildProductCategoriesQuery,
  useGetLeafProductCategoriesQuery,
  useProductCategoryQuery,
} from "../../../redux/services/productCategoryApi";
import { useEffect } from "react";
import Image from "../../../components/ui/Image";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/ui/Loader";
const Create = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);

  const [discountType, setDiscountType] = useState("");
  const [unlimitedStock, setUnlimitedStock] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [gallaryImage, setGallaryImage] = useState();
  const navigate = useNavigate();
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  const { data: allCategories } = useProductCategoryQuery();
  const { data: leafCategories, isLoading: leafLoading } =
    useGetLeafProductCategoriesQuery();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // useEffect(() => {
  //   if (childCategoryRes?.Categories) {
  //     const childs = childCategoryRes.Categories.map((cat) => ({
  //       value: cat._id,
  //       label: cat.name,
  //     }));
  //     setChildCategories(childs);
  //   } else {
  //     setChildCategories([]);
  //   }
  // }, [childCategoryRes]);

  useEffect(() => {
    if (allCategories?.Categories) {
      const parents = allCategories.Categories.filter(
        (cat) => cat.isActive && cat.level === 0
      ).map((cat) => ({
        value: cat._id,
        label: cat.name,
      }));

      setParentCategories(parents);
    }
  }, [allCategories]);

  //add product function
  const AddProductSubmit = async (e) => {
    console.log("checks");
    const formData = new FormData();
    formData.append("name", e.name);
    formData.append("category", e.category);
    formData.append("description", e.description);
    formData.append("productType", e.productType);
    formData.append("price", e.price);
    if (e.discountType) {
      formData.append("discountType", e.discountType);
      formData.append("discountValue", e.discountValue || 0);
    }

    formData.append("isActive", e.isActive);
    formData.append("displayOrder", e.displayOrder);
    formData.append("isFeatured", e.isFeatured);
    if (e.thumbnail && e.thumbnail[0]) {
      formData.append("thumbnail", e.thumbnail[0]);
    }
    if (e.images && e.images.length > 0) {
      Array.from(e.images).forEach((file) => {
        formData.append("images", file);
      });
    }
    formData.append("unlimitedStock", !!e.unlimitedStock);

    if (!e.unlimitedStock) {
      formData.append("stock", e.stock || 0);
    }

    try {
      const res = await createProduct(formData).unwrap();
      console.log(res, "rtes data, Check data for");
      if (res.success) {
        toast.success(res?.message);
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(error);
      if (error) {
        toast.error(error.data?.message);
      }
    }
  };

  return (
    <>
      {createProductLoading && <Loader />}
      <Breadcrumb pageTitle="Products" subTitle="add" pagePath="/products" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          Add New Product
        </h3>

        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(AddProductSubmit)}
        >
          {/* ================= BASIC INFO ================= */}
          <div>
            <h4 className="mb-4 font-medium text-gray-700 dark:text-gray-300">
              Basic Information
            </h4>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Input
                label="Product Name *"
                name="name"
                placeholder="Enter product name"
                {...register("name", { required: "Name is required" })}
                error={errors?.name?.message}
              />

              <Controller
                control={control}
                name="category"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <CommonSelect
                    label="Category *"
                    placeholder="Select category"
                    options={
                      leafCategories?.Categories?.map((cat) => ({
                        value: cat._id,
                        label: cat.name,
                      })) || []
                    }
                    value={leafCategories?.Categories?.map((cat) => ({
                      value: cat._id,
                      label: cat.name,
                    })).find((c) => c.value === field.value)}
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />

              <Input
                type="textarea"
                label="Description"
                name="description"
                placeholder="Short product description"
                {...register("description")}
              />

              <Input
                type="number"
                label="Display Order"
                name="displayOrder"
                placeholder="0"
                {...register("displayOrder")}
              />
            </div>
          </div>

          {/* ================= PRODUCT TYPE ================= */}
          <div>
            <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
              Product Type
            </h4>

            <div className="flex gap-6">
              <label className="flex items-center gap-2  text-gray-700 dark:text-gray-400">
                <input
                  type="radio"
                  name="productType"
                  value="Veg"
                  {...register("productType", {
                    required: "Please select product type",
                  })}
                />
                Veg
              </label>

              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
                <input
                  type="radio"
                  name="productType"
                  value="Non-Veg"
                  {...register("productType")}
                />
                Non-Veg
              </label>
            </div>
          </div>

          {/* ================= IMAGES ================= */}
          <div>
            <h4 className="mb-4 font-medium text-gray-700 dark:text-gray-300">
              Product Images
            </h4>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <Input
                    type="file"
                    label="Thumbnail Image *"
                    name="thumbnail"
                    {...register("thumbnail", {
                      onChange: (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImagePreview(URL.createObjectURL(file));
                        }
                      },
                    })}
                  />
                </div>

                <div className="h-24 w-24 rounded-xl border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Preview</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  type="file"
                  label="Gallery Images"
                  name="images"
                  multiple
                  {...register("images", {
                    onChange: (e) => {
                      const files = Array.from(e.target.files);
                      setGallaryImage(
                        files.map((file) => URL.createObjectURL(file))
                      );
                    },
                  })}
                />

                {gallaryImage?.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 max-h-32 overflow-y-auto p-2 border rounded-xl">
                    {gallaryImage.map((img, index) => (
                      <div
                        key={index}
                        className="h-20 w-full rounded-lg overflow-hidden border"
                      >
                        <img
                          src={img}
                          alt="gallery"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= PRICING ================= */}
          <div>
            <h4 className="mb-4 font-medium text-gray-700 dark:text-gray-300">
              Pricing & Discount
            </h4>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Input
                type="number"
                label="Price (₹) *"
                name="price"
                placeholder="Enter price"
                {...register("price", { required: "Price is required" })}
              />
              <Controller
                name="discountType"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    label="Discount Type"
                    placeholder="No discount"
                    options={[
                      { value: "percentage", label: "Percentage (%)" },
                      { value: "flat", label: "Flat Amount (₹)" },
                    ]}
                    onChange={(e) => {
                      field.onChange(e?.value || "");
                      setDiscountType(e?.value || "");
                    }}
                  />
                )}
              />

              {discountType === "percentage" && (
                <Input
                  type="number"
                  name="discountValue"
                  label="Discount Percentage (%)"
                  placeholder="e.g. 10"
                  {...register("discountValue")}
                />
              )}

              {discountType === "flat" && (
                <Input
                  type="number"
                  name="discountValue"
                  label="Discount Amount (₹)"
                  placeholder="e.g. 150"
                  {...register("discountValue")}
                />
              )}
            </div>
          </div>

          {/* ================= STOCK ================= */}
          <div>
            <h4 className="mb-4 font-medium text-gray-700 dark:text-gray-300">
              Stock Management
            </h4>

            <label className="flex items-center gap-2 mb-4 text-gray-700 dark:text-gray-400">
              <input
                type="checkbox"
                name="unlimitedStock"
                {...register("unlimitedStock", {
                  onChange: (e) => setUnlimitedStock(e.target.checked),
                })}
              />
              Unlimited Stock
            </label>

            {!unlimitedStock && (
              <Input
                type="number"
                label="Stock Quantity"
                name="stock"
                placeholder="Available units"
                {...register("stock")}
              />
            )}
          </div>

          {/* ================= STATUS ================= */}
          <div className="flex gap-8">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
              <input
                type="checkbox"
                className="accent-brand-500 h-4 w-4"
                name="isActive"
                {...register("isActive")}
              />
              Active
            </label>

            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
              <input
                type="checkbox"
                name="isFeatured"
                className="accent-brand-500 h-4 w-4"
                {...register("isFeatured")}
              />
              Featured Product
            </label>
          </div>

          {/* ================= SUBMIT ================= */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-6 rounded-lg bg-brand-500 px-6 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              {isSubmitting ? "Adding" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
