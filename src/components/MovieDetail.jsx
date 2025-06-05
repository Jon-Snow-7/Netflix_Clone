

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <div className="p-6 flex flex-col items-center ">
      <h1 className="text-3xl font-bold mb-4">{movie.movieName}</h1>
      <img src={movie.moviePoster} alt={movie.movieName} className="w-64 h-auto mb-4" />
      <p><strong>Release Year:</strong> {movie.releaseDate?.slice(0, 4)}</p>
      <p><strong>Rating:</strong> ⭐ {movie.rating}/10</p>
      <p><strong>Runtime:</strong> {movie.runTime}s</p>
      <p className="mt-4 max-w-xl"><strong>Description:</strong> {movie.description}</p>
    </div>
  );
};

export default MovieDetail;
