import React from "react";
import MovieDetail from "./MovieDetail";
import { useNavigate } from "react-router-dom";

const HoverCard = ({ data, position, hoverCardRef }) => {
      const navigate = useNavigate();

  if (!data || !position) return null;

  const CARD_WIDTH = position.width + 150;
  const CARD_HEIGHT = 500;
  // console.log(data);

  const handleWatchNow = () => {
    navigate(`/movie/${data.movieId}`);
    console.log(data.movieId);
    console.log(data);
  };
  

  return (
    <div
      ref={hoverCardRef}
      className="absolute z-[99999] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out animate-fadeInAndScale"
      style={{
        top: -20,
        left: position.left - 195,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        maxWidth: "90vw",
        maxHeight: "90vh",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        opacity: 1,
        transform: "scale(1)",
      }}
    >
      {/* Blurred Background Image */}
      <div className="relative w-full h-full ease-in-out">
        <img
          src={data.moviePoster}
          alt={data.movieName}
          className="absolute top-0 left-0 w-full h-full object-cover filter brightness-40"
        />

        {/* Overlay Content on Top */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 text-white">
          <h2 className="text-xl font-bold">{data.movieName}</h2>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">
              {data.releaseDate.slice(0, 4)}
            </span>
            <span className="text-yellow-400 text-sm">⭐ {data.rating}/10</span>
            <span className="text-gray-300 text-sm">{data.runTime}s</span>
          </div>
          <p className="mt-2 text-sm text-gray-200">{data.description}</p>
          <div className="flex gap-6 mt-6 justify-center">
            <button onClick={handleWatchNow} className="flex items-center gap-3 bg-white hover:bg-gray-400  text-black  active:scale-95 transition-all duration-300 shadow-xl px-7 py-3 rounded-2xl font-bold text-base hover:shadow-2xl">
              ▶ <span className="tracking-wide"   
>Watch Now</span>
            </button>
            <button className="flex items-center gap-3 bg-white hover:bg-gray-400  text-black  active:scale-95 transition-all duration-300 shadow-xl px-7 py-3 rounded-2xl font-bold text-base hover:shadow-2xl">
              + <span className="tracking-wide">Add</span>
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default HoverCard;
