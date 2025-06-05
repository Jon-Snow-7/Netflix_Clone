

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8080/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movie:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
   <div className="p-8 flex flex-col items-center bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white">

    <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg"
        title="Go back"
      >
        &times;
      </button>
  <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">{movie.movieName}</h1>

  <img
    src={movie.moviePoster}
    alt={movie.movieName}
    className="w-72 h-auto mb-6 rounded-lg shadow-xl border-2 border-gray-700"
  />

  <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-md w-full max-w-2xl space-y-4">
    <div className="flex flex-wrap justify-between text-sm text-gray-300">
      <p><strong>📅 Release Year:</strong> {movie.releaseDate?.slice(0, 4)}</p>
      <p><strong>⭐ Rating:</strong> {movie.rating}/10</p>
      <p><strong>⏱ Runtime:</strong> {movie.runTime}s</p>
    </div>

    <p className="mt-2 text-base text-gray-200">
      <strong className="text-white">📝 Description:</strong> {movie.description}
    </p>

    {movie.actorList && (
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white mb-3">🎭 Cast</h3>
        <div className="flex flex-wrap gap-3">
          {movie.actorList.split(",").map((actor, index) => (
            <span
              key={index}
              className="bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-gray-600 transition"
            >
              {actor.trim()}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default MovieDetail;
