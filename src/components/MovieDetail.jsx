import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../redux/apis";

const MovieDetail = () => {
  const { id } = useParams();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
getMovieById(id)
  .then((data) => {
    setMovie(data);
    setLoading(false);
  })
  .catch((err) => {
    console.error("Failed to fetch movie:", err);
    setLoading(false);
  });

  
 

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="relative min-h-screen max-sm:w-screen text-white overflow-hidden">
      <img
        src="../public/images/Batman.jpg"
        alt={movie.movieName}
        className="fixed top-0 left-0 w-full max-sm:w-screen h-screen object-cover z-0"
      />

      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-t from-black to-transparent z-10" />

      <div className="relative z-20 p-8 flex flex-col items-center min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center hover:backdrop-blur-lg text-2xl font-bold shadow-lg"
          title="Go back"
        >
          &times;
        </button>

        <div className="absolute bottom-[5%] left-[5%] ">
          <div className=" p-6 rounded-xl shadow-md w-full max-w-2xl text-left space-y-4">
            <h1 className="text-4xl font-extrabold mb-6 text-left tracking-wide">
              {movie.movieName}
            </h1>
            <div className="flex flex-wrap justify-between text-sm text-gray-300">
              <p>
                <strong>📅 Release Year:</strong>{" "}
                {movie.releaseDate?.slice(0, 4)}
              </p>
              <p>
                <strong>⭐ Rating:</strong> {movie.rating}/10
              </p>
              <p>
                <strong>⏱ Runtime:</strong> {movie.runTime}s
              </p>
            </div>
            {movie.actorList && (
              <div className="mt-4">
                <h3 className="text-lg max-sm:text-md font-bold text-white mb-3">🎭 Cast</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.actorList.map((actor, index) => (
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
            <p className="mt-2 text-base text-gray-200">
              <strong className="text-white">📝 Plot :</strong>{" "}
              {movie.description}
            </p>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
