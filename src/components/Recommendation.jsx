import React, { useEffect, useState } from "react";
import HorizontalScroller from "./HorizontalScroller";
import MovieDetail from "./MovieDetail"; // Import MovieDetail for modal
import { useDispatch, useSelector } from "react-redux";
import { recommendationMovieData } from "../redux/slice/recommendationSlice";

const Recommendation = () => {
  const dispatch=useDispatch();
  const recommendMovieState=useSelector((state)=>state.recommend)
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    dispatch(recommendationMovieData());
  }, [dispatch]);

  const recommendation =recommendMovieState?.data?.results || [];

  return (
    <>
      <HorizontalScroller title="Recommendation">
        {recommendation.map((movie) => (
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
            <br />
            <br />
          </div>
        ))}
      </HorizontalScroller>

      {selectedMovieId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="relative bg-[#111] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMovieId(null)}
              className="absolute !bg-red-500 top-2 right-2 text-white text-2xl"
            >
              ✕
            </button>
            <MovieDetail id={selectedMovieId} isModal />
          </div>
        </div>
      )}
    </>
  );
};

export default Recommendation;
