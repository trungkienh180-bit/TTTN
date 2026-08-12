import { useState, useEffect } from "react";
import banner1 from "../assets/banners/magic1.jpg";
import banner2 from "../assets/banners/magic2.jpg";
import banner3 from "../assets/banners/ttg-ctkm-btsc.jpg";

const banners = [banner1, banner2, banner3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-900 pt-6 pb-6 transition-colors duration-300">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.15)] group cursor-pointer border border-red-900/30">
          {/* Images Slider */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {banners.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Banner Khuyến Mãi ${index + 1}`}
                className="w-full flex-shrink-0 object-cover"
                style={{
                  minWidth: "100%",
                  height: "auto",
                  aspectRatio: "1600 / 609",
                }}
                draggable="false"
              />
            ))}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  current === index
                    ? "bg-red-500 w-8"
                    : "bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((prev) =>
                prev === 0 ? banners.length - 1 : prev - 1,
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            &#10094;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((prev) => (prev + 1) % banners.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            &#10095;
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
