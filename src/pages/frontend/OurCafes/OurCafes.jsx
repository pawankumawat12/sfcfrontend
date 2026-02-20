const cafes = [
    {
      id: 1,
      name: "BrewHaus – Andheri",
      city: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    },
    {
      id: 2,
      name: "BrewHaus – Indiranagar",
      city: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    },
    {
      id: 3,
      name: "BrewHaus – Connaught Place",
      city: "Delhi",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
  ];
  
  const OurCafes = () => {
    return (
      <section className="py-16 bg-white" id="cafes">
        <div className="max-w-7xl mx-auto px-6">
  
          {/* Heading */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4b2e2b]">
              Our Cafes
            </h2>
  
            <a
              href="/cafes"
              className="hidden md:inline-block text-sm font-semibold text-[#4b2e2b] hover:underline"
            >
              View All Cafes →
            </a>
          </div>
  
          {/* Cafes */}
          <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 md:gap-8">
            {cafes.map((cafe) => (
              <div
                key={cafe.id}
                className="min-w-[260px] md:min-w-0 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="h-48 w-full object-cover"
                />
  
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-800">
                    {cafe.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {cafe.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Mobile CTA */}
          <div className="mt-8 text-center md:hidden">
            <a
              href="/cafes"
              className="inline-block rounded-full bg-[#4b2e2b] px-6 py-3 text-sm font-semibold text-white"
            >
              Find a Cafe Near You
            </a>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default OurCafes;
  