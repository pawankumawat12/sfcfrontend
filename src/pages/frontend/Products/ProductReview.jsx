const ProductReview = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-baseline">
        <h2 className="text-xl font-semibold mb-6 ">Customer Reviews</h2>
        <button className="mt-6 w-[150px] bg-[#4b2e2b] text-white py-3 rounded-full font-semibold hover:bg-[#3a2320]">
          Add Reviews
        </button>
      </div>

      <div className="space-y-5">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-gray-50 p-5 rounded-xl border">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Rahul Sharma</p>
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            </div>

            <p className="mt-2 text-gray-600 text-sm">
              Very tasty and fresh burger. Loved the quality and packaging.
              Highly recommended! 😍🍾
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReview;
