import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight , Plus} from 'lucide-react'; // Optional: use lucide-react icons
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const navigate = useNavigate();
  const sliderData = [
    {
      url: "images/Batman.jpg",
      title: "The Batman",
      releaseyear: "2022",
      genre: "Action, Crime",
      rating: "IMDb: 7.8",
      runtime: "176 min",
      plot: "Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.",
    },
    {
      url: "images/Avenger.jpg",
      title: "Avengers: Endgame",
      releaseyear: "2019",
      genre: "Action, Sci-Fi",
      rating: "IMDb: 8.4",
      runtime: "181 min",
      plot: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    },
    {
      url: "images/Imitation.jpg",
      title: "The Imitation Game",
      releaseyear: "2014",
      genre: "Biography, Drama, Thriller",
      rating: "IMDb: 8.0",
      runtime: "114 min",
      plot: "During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians while attempting to come to terms with his troubled private life.",
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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderData.length);
    }, 7000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleWatchNow = ({index}) => {
    if (index === 1) {
      navigate(`/movie/16`);
    }
    else if(index === 2) {
      navigate(`/movie/84`);
    }
    else {
      // Default case or if index is 0
      navigate(`/movie/37`);
    }
  };
  return (
    <div className="pl-30 relative w-full h-[85vh] overflow-hidden">
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
            <span>{sliderData[index].runtime}</span>
          </div>
          <p className="text-sm text-gray-200 mb-6">{sliderData[index].plot}</p>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleWatchNow({index})}
            className="border-2 border-white hover:bg-black bg-white text-black hover:text-white font-semibold px-26 py-4 rounded-md shadow-md transition duration-300 text-[19.5px] ">
              Watch Now
            </button>

            <div className="relative group">
              <button className= "border-2 border-white hover:bg-black bg-white text-black hover:text-white p-4 rounded-full transition duration-300">
                <Plus className="w-9 h-9" />
              </button>
              <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
                Watchlist
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-20 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-white/20 backdrop-blur text-white p-3 rounded shadow transition duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-white/20 backdrop-blur text-white p-3 rounded shadow transition duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Carousel;