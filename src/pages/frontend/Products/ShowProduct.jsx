import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../redux/services/productApi";
import ProductReview from "./ProductReview";
import RelatedProduct from "./RelatedProduct";
import { Loader } from "lucide-react";
import Image from "../../../components/ui/Image";
import { useState, useEffect } from "react";

const ShowProduct = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetProductQuery(slug);
  const product = data?.product;

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product?.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <Image
            src={selectedImage}
            alt="product"
            className="w-[450px] h-[350px] object-cover rounded-2xl"
          />

          {product.images?.length > 0 && (
            <div className="flex gap-3 mt-4">
              {/* Thumbnail bhi selectable */}
              <Image
                src={product.thumbnail}
                alt="thumb"
                onClick={() => setSelectedImage(product.thumbnail)}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
              />

              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="gallery"
                  onClick={() => setSelectedImage(img)}
                  className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-gray-500">{product?.category?.name}</p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            {product?.name}
          </h1>

          <span
            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full 
              ${
                product.productType === "Veg"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {product.productType}
          </span>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-[#4b2e2b]">
              ₹{product.sellingPrice || product.price}
            </span>

            {product.discountType && (
              <span className="line-through text-gray-400">
                ₹{product.price}
              </span>
            )}
          </div>

          <p
            className={`mt-2 text-sm font-medium ${
              product.stockStatus === "In Stock"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.stockStatus}
          </p>

          <p className="mt-5 text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          <button className="mt-6 w-full bg-[#4b2e2b] text-white py-3 rounded-full font-semibold hover:bg-[#3a2320]">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-14 space-y-14">
        <ProductReview />
        <RelatedProduct product={product} />
      </div>
    </section>
  );
};

export default ShowProduct;
