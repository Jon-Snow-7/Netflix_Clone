import React, { useEffect, useState } from 'react';
import HorizontalScroller from './HorizontalScroller';
import MovieDetail from './MovieDetail'; 
import { useDispatch,useSelector } from 'react-redux';
import { popularData } from '../redux/slice/popularSlice';

const Popular = () => {
  const dispatch=useDispatch();
  const popularState=useSelector((state)=>state.popular)
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    dispatch(popularData());
  }, [dispatch]);
  const popular=popularState?.data || [];

  return (
    <>
      <HorizontalScroller title="Popular">
        {popular.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[250px] cursor-pointer"
            onClick={() => setSelectedMovieId(movie.movieId)}
          >
            <img
              src={`${movie.moviePoster}`}
              alt={movie.movieName}
              className="rounded-md w-full h-80 object-cover"
            />
            <p className="mt-2 text-sm text-white">{movie.movieName}</p>
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

export default Popular;
