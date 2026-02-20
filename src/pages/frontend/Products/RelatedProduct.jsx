import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/services/productApi";
import Image from "../../../components/ui/Image";

const RelatedProduct = ({ product }) => {
  const navigate = useNavigate();

  const { data: Products, isLoading: productsLoading } = useGetProductsQuery({
    category: product?.category?._id,
    limit: 8,
  });

  const relatedProducts =
    Products?.products?.filter(
      (item) => item._id !== product?._id && item.isActive
    ) || [];

  if (productsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-xl font-semibold mb-6">Related Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {relatedProducts.length === 0 ? (
          <div className="flex items-center justify-center w-full whitespace-nowrap">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#4b2e2b] animate-pulse">
                Coming Soon
              </h1>
              <p className="mt-3 text-gray-500">
                Something awesome is brewing...
              </p>
            </div>
          </div>
        ) : (
          relatedProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-2xl p-3 hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/product/${item?.slug}`)}
            >
              <div className="h-32 bg-gray-200 rounded-xl mb-3 overflow-hidden">
                <Image
                  src={item?.thumbnail}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-medium text-gray-800">{item?.name}</h3>
              <p className="text-sm text-gray-500">{item?.category?.name}</p>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-lg font-bold text-[#4b2e2b]">
                  ₹{item.sellingPrice || item.price}
                </span>

                {item.discountType && (
                  <span className="line-through text-gray-400">
                    ₹{item.price}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RelatedProduct;
