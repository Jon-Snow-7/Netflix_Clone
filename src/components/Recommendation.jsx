// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import HorizontalScroller from "./HorizontalScroller";

// /////////////////////add movie id to get recommendations/////////////////////

// const Recommendation = () => {

//     const [recommendation, setRecommendation] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/movie/1098006/recommendations?api_key=20ac0341ec5b2096d68f9c473d7b5d69`
//     );
//     setRecommendation(res.data.results.slice(6, 100)); // Demo Continue Watching
//   };
//   fetchData();
// }, []);
//   return (
//     <HorizontalScroller title="Recommendation">
//       {recommendation.map((movie) => (
//         <div key={movie.id} className="min-w-[180px]">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//             className="rounded-md w-full h-60 object-cover"
//           />
//           <p className="mt-2 text-sm text-white">{movie.title}</p>
//           <br></br>
//           <br></br>
//         </div>
//       ))}
//     </HorizontalScroller>
//   );
// };

// export default Recommendation;


import axios from "axios";
import React, { useEffect, useState } from "react";
import HorizontalScroller from "./HorizontalScroller";
import MovieDetail from "./MovieDetail"; // Import MovieDetail for modal

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/1098006/recommendations?api_key=20ac0341ec5b2096d68f9c473d7b5d69`
      );
      setRecommendation(res.data.results.slice(6, 100)); // Demo Continue Watching
    };
    fetchData();
  }, []);

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
