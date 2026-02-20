import React from "react";
import Breadcrumb from '../../../components/ui/BreadCrumb';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Show = () => {
  const [product, setProduct] = useState();
  const { slug } = useParams();
  const { data, isLoading } = useGetProductQuery(slug);
  useEffect(() => {
    if (data?.product) {
      setProduct(data.product);
    }
  }, [data]);
  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div>No product found</div>;
  }
  return (
    <>
      <Breadcrumb pageTitle="Products" subTitle="View" pagePath="/products" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          Product Details
        </h3>

        {/* ================= BASIC INFO ================= */}
        <Section title="Basic Information">
          <Info label="Product Name" value={product.name} />
          <Info label="Description" value={product.description} />
          <Info label="Display Order" value={product.displayOrder} />
        </Section>

        {/* ================= CATEGORY ================= */}
        <Section title="Category">
          <Info label="Category Name" value={product.category?.name} />
          <Info label="Category Slug" value={product.category?.slug} />
        </Section>

        {/* ================= PRODUCT TYPE ================= */}
        <Section title="Product Type">
          <Badge
            label={product.productType}
            color={product.productType === "Veg" ? "green" : "red"}
          />
        </Section>

        {/* ================= IMAGES ================= */}
        <Section title="Product Images">
          <div className="flex gap-6 items-start">
            {/* Thumbnail */}
            <div>
              <p className="mb-2 text-sm text-gray-500">Thumbnail</p>
              <Image
                src={product.thumbnail}
                alt="thumbnail"
                className="h-24 w-full rounded-xl object-cover border"
              />
            </div>

            {/* Gallery */}
            <div>
              <p className="mb-2 text-sm text-gray-500">Gallery</p>
              <div className="grid grid-cols-4 gap-3">
                {product.images?.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt="gallery"
                    className="h-24 w-full rounded-lg object-cover border"
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ================= PRICING ================= */}
        <Section title="Pricing & Discount">
          <Info label="Price (₹)" value={product.price} />

          {product.discountType && (
            <>
              <Info label="Discount Type" value={product.discountType} />
              <Info
                label="Discount Value"
                value={
                  product.discountType === "flat"
                    ? `₹ ${product.discountValue}`
                    : `${product.discountValue}%`
                }
              />
            </>
          )}
          <Info label="Selling Price (₹)" value={product.sellingPrice} />
        </Section>

        {/* ================= STOCK ================= */}
        <Section title="Stock Information">
          <Badge
            label={
              product.unlimitedStock
                ? "Unlimited Stock"
                : `Stock: ${product.stock}`
            }
            color={product.unlimitedStock ? "blue" : "gray"}
          />
          <Info label="Stock Status" value={product.stockStatus} />
        </Section>

        {/* ================= FLAGS ================= */}
        <Section title="Status">
          <div className="flex gap-4">
            <Badge label="Active" active={product.isActive} />
            <Badge label="Featured" active={product.isFeatured} />
          </div>
        </Section>
      </div>
    </>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h4 className="mb-4 font-medium text-gray-700 dark:text-gray-300">
      {title}
    </h4>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
      {value || "-"}
    </p>
  </div>
);

const Badge = ({ label, active, color = "green" }) => {
  const colors = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ${
        active === false ? "bg-red-100 text-red-600" : colors[color]
      }`}
    >
      {label}
    </span>
  );
};

export default Show;
