import { Activity, useState } from "react";
import Image from "../../../components/ui/Image";
import Loader from "../../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import GameSection from "../Games/Gamesection";
import { useProductCategoryQuery } from "../../../redux/services/productCategoryApi";
import { useGetProductsQuery } from "../../../redux/services/productApi";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const { data: productCategory, isLoading: getCategoryLoading } =
    useProductCategoryQuery();
  const categories =
    productCategory?.Categories.filter((item) => item.isActive) || [];

  const { data: productData, isLoading: productLoading } = useGetProductsQuery({
    page: 1,
    limit: 20,
    category: activeCategory === "all" ? undefined : activeCategory,
  });

  const filteredProducts =
    productData?.data?.filter((item) => item.isActive) || [];
console.log(productData, "Check filter products")
  if (getCategoryLoading || productLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* //games */}

      <GameSection />

      <section className="bg-[#faf7f5] py-16" id="menu">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4b2e2b]">
            Explore Our Menu
          </h2>

          <div className="flex gap-4 overflow-x-auto justify-start md:justify-center mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-3 rounded-full text-sm font-semibold
                 ${
                   activeCategory === "all"
                     ? "bg-[#4b2e2b] text-white"
                     : "bg-white text-gray-700"
                 }`}
            >
              All
            </button>
            {categories?.map((cat, key) => (
              <>
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold
                   ${
                     activeCategory === cat._id
                       ? "bg-[#4b2e2b] text-white"
                       : "bg-white text-gray-700"
                   }`}
                >
                  {cat.name}
                </button>
              </>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-[20vh]">
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
              filteredProducts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition group cursor-pointer"
                  onClick={() => navigate(`/product/${item.slug}`)}
                >
                  <div className="h-40 overflow-hidden rounded-t-2xl">
                    <Image
                      src={item?.thumbnail}
                      alt={item?.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-[#4b2e2b] font-semibold mt-1">
                      ₹{item.price}
                    </p>

                    <button className="mt-4 w-full rounded-full bg-[#4b2e2b] py-2 text-sm font-semibold text-white hover:bg-[#3a2320] transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
