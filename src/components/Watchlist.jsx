import React, { useEffect, useState } from "react";
import HorizontalScroller from "./HorizontalScroller";

import MovieDetail from "./MovieDetail"; // import modal component
import { useDispatch, useSelector } from "react-redux";
import { watchlistMovieData } from "../redux/slice/watchlistSlice";
const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlistState = useSelector((state) => state.watchlist);
  useEffect(() => {
    dispatch(watchlistMovieData());
  }, [dispatch]);

  const watchlist = watchlistState?.data?.results || [];
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  return (
    <>
      <HorizontalScroller title="Your Watchlist">
        {watchlist.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[250px] cursor-pointer"
            onClick={() => setSelectedMovieId(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md w-full h-80 object-cover"
            />
            <p className="mt-2 text-sm text-white">{movie.title}</p>
          </div>
        ))}
      </HorizontalScroller>

      {selectedMovieId && (
        <div className="fixed inset-0 z-50 flex bg-black bg-opacity-80 items-center justify-center p-4">
          <div className="relative bg-[#111] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMovieId(null)}
              className="absolute !bg-red-500 top-2 right-2 text-white text-2xl"
            >
              x
            </button>
            <MovieDetail id={selectedMovieId} isModal />
          </div>
        </div>
      )}
    </>
  );
};

export default Watchlist;
