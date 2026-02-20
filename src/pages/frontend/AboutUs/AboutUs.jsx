const AboutUs = () => {
    return (
      <section className="bg-[#faf7f5]" id="about">
        {/* Hero */}
        <div className="relative h-[50vh]">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
            alt="Cafe"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Our Story
            </h1>
          </div>
        </div>
  
        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#4b2e2b] mb-6">
                Brewing Experiences, Not Just Coffee
              </h2>
  
              <p className="text-gray-700 mb-4 leading-relaxed">
                BrewHaus started with a simple idea — create a space where
                people can slow down, sip great coffee, and feel at home.
                From a single café to a growing chain, our focus has always
                been quality, consistency, and community.
              </p>
  
              <p className="text-gray-700 leading-relaxed">
                We source premium beans, train passionate baristas, and
                design spaces that invite conversations, creativity,
                and comfort.
              </p>
            </div>
  
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                alt="Coffee"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
  
          {/* Values */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "Carefully sourced beans & crafted drinks.",
              },
              {
                title: "Expert Baristas",
                desc: "Trained professionals who love coffee.",
              },
              {
                title: "Warm Spaces",
                desc: "Designed for comfort & community.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-[#4b2e2b] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  