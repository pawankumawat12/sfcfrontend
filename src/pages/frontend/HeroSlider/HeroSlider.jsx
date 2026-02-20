import { useState, useEffect } from "react";
import momos from "../../../assets/images/games/momos.jpg";
import pizza from "../../../assets/images/games/pizza.jpg";
import burger from "../../../assets/images/games/burger.jpg";
import chaumin from "../../../assets/images/games/chaumin.jpg";
import food from "../../../assets/images/games/food.jpg";
  const slides = [
    {
      image: momos,
      title: "Steaming Hot Momos",
      subtitle: "Soft, juicy, and full of flavor",
    },
    {
      image: pizza,
      title: "Cheesy Pizza",
      subtitle: "Loaded with toppings and love",
    },
    {
      image: burger,
      title: "Juicy Burger",
      subtitle: "Big bites, bold taste",
    },
    {
      image: chaumin,
      title: "Spicy Chowmein",
      subtitle: "Wok-tossed noodles, street-style",
    },
    {
      image: food,
      title: "Delicious Food",
      subtitle: "Happiness served on a plate",
    },
  ];
  

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[55vh] md:h-[65vh] lg:h-[70vh] overflow-hidden" id="home">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start">
            <div className="max-w-7xl w-full px-15 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-base md:text-xl text-gray-200 mb-6">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="rounded-full bg-[#4b2e2b] px-6 py-3 text-white font-semibold hover:bg-[#3a2320] transition">
                  Order Online
                </button>
                <button className="rounded-full border border-white px-6 py-3 text-white font-semibold hover:bg-white hover:text-black transition">
                  Our Cafes
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows (hide on very small screens if you want) */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        ›
      </button>
    </section>
  );
};

export default HeroSlider;
