import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Optional: use lucide-react icons

const Carousel = () => {
  const sliderData = [
    {
      url: "https://wallpapers.com/images/featured/avengers-vm16xv4a69smdauy.jpg",
      title: "The Avengers",
      releaseyear: "2012",
      genre: "Action, Drama",
      rating: "IMDb: 8.0",
      plot: "Earth's mightiest heroes must come together and learn to fight as a team to stop the mischievous Loki and his alien army.",
    },
    {
      url: "images/bat.jpg",
      title: "The Batman",
      releaseyear: "2022",
      genre: "Action, Crime",
      rating: "IMDb: 7.8",
      plot: "Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.",
    },
  ];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const handlePrev = () => {
    setIndex((prev) => (prev + sliderData.length - 1) % sliderData.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % sliderData.length);
  };

  // Auto-scroll every 7 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderData.length);
    }, 7000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="pl-30 relative w-full h-[80vh] overflow-hidden">
      {/* Slide */}
      <div
        className="transition-all duration-700 ease-in-out relative w-full h-full"
        key={index}
      >
        <img
          src={sliderData[index].url}
          alt="slide"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/30"></div>

        {/* Content */}
        <div className="absolute bottom-20 left-10 text-white max-w-xl z-10">
          <h2 className="text-5xl font-bold mb-4">{sliderData[index].title}</h2>
          <div className="flex space-x-6 text-lg mb-2 font-semibold text-gray-300">
            <span>{sliderData[index].releaseyear}</span>
            <span>{sliderData[index].genre}</span>
            <span>{sliderData[index].rating}</span>
          </div>
          <p className="text-sm text-gray-200">{sliderData[index].plot}</p>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-30 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Carousel;
