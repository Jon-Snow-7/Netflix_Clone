import React from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
const MovieCard = ({ data }) => {
  return (
    <div
      key={data.movieId}
      className="
        group
        relative
        w-40 md:w-55
        flex-shrink-0
        cursor-pointer
        transition-transform duration-300 ease-in-out
        hover:scale-105
        hover:z-20
      "
    >
      {/* Poster Container */}
      <div
        className="
          relative
          rounded-lg
          overflow-hidden
          shadow-md
          group-hover:shadow-2xl
          transition-shadow duration-300 ease-in-out
          aspect-[2/3]
          bg-black
        "
      >
        <img
          src={data.moviePoster}
          alt={data.movieName}
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black via-black/60 to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            flex flex-col justify-end
            p-1
            text-white
          "
        >
             <div className="p-1 text-white space-y-2">
            {/* Buttons */}

            {/* Title */}
            <h3 className="text-lg font-bold line-clamp-1">{data.movieName}</h3>

            {/* Metadata */}
            <div className="text-sm text-gray-400 flex gap-4">
              <span>{data.release_date?.slice(0, 4)}</span>
              <span>⭐ {data.rating}</span>
              <span>{data.runTime}s</span>
            </div>
            {/* <div className="text-sm text-gray-400 flex gap-4">
                <p>{data.description.slice(0,60)}...</p>
            </div> */}
            <div className="flex gap-2 mb-1">
              <button className="flex items-center bg-white text-black px-3 py-1.5 rounded-full text-sm font-semibold shadow hover:bg-neutral-200 transition">
                <FaPlay size={14} className="mr-2" />
                Watch
              </button>
              <button className="flex items-center bg-zinc-800 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow hover:bg-zinc-700 transition">
                <FaPlus size={14} className="mr-2" />
                Watchlist
              </button>
            </div>
            </div>
            </div>
            </div>
    </div>
  );
};

export default MovieCard;


