// components/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = ({ id: propId, isModal = false }) => {
  const params = useParams();
  const id = propId || params.id;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=20ac0341ec5b2096d68f9c473d7b5d69`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className={`text-white ${isModal ? '' : 'bg-black/90'} p-6 flex flex-col items-center justify-center max-w-[600px] mx-auto mt-[100px]`}>
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-64 rounded-lg"
      />
      <p className="mt-4 text-center"><span className="font-bold">PLOT:</span> {movie.overview}</p>
      <p className="mt-2 text-yellow-400">⭐ IMDb: {movie.vote_average}</p>
      <p className="mt-1 text-gray-400"><span className="font-bold">Release Date:</span> {movie.release_date}</p>
      <p className="mt-1 text-gray-400"><span className="font-bold">Duration:</span> {movie.runtime} mins</p>

      {movie.genres && (
        <div className="flex flex-wrap gap-2 mt-4">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
