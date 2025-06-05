// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import HorizontalScroller from './HorizontalScroller';
// import MovieDetail from './MovieDetail'; // Import MovieDetail for modal

// const Trending = () => {
//   const [trending, setTrending] = useState([]);
//   const [selectedMovieId, setSelectedMovieId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get(
//         `https://api.themoviedb.org/3/trending/movie/day?api_key=20ac0341ec5b2096d68f9c473d7b5d69`
//       );
//       setTrending(res.data.results.slice(6, 100));
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <HorizontalScroller title="Trending">
//         {trending.map((movie) => (
//           <div
//             key={movie.id}
//             className="min-w-[250px] cursor-pointer"
//             onClick={() => setSelectedMovieId(movie.id)}
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="rounded-md w-full h-80 object-cover"
//             />
//             <p className="mt-2 text-sm text-white">{movie.title}</p>
//             <br />
//             <br />
//           </div>
//         ))}
//       </HorizontalScroller>

//       {selectedMovieId && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
//           <div className="relative bg-[#111] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setSelectedMovieId(null)}
//               className="absolute !bg-red-500 top-2 right-2 text-white text-2xl"
//             >
//               ✕
//             </button>
//             <MovieDetail id={selectedMovieId} isModal />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Trending;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestMovieData } from "../redux/slice/latestmovieSlice";
import HorizontalScroller from "./HorizontalScroller";
import MovieDetail from "./MovieDetail";

const LatestRelease = () => {
  const dispatch = useDispatch();
  const latestState = useSelector((state) => state.latest);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    dispatch(latestMovieData());
  }, [dispatch]);

  let latestMovie = latestState?.data?.results || [];

if (latestMovie.length > 0) {
  latestMovie = latestMovie
    .slice() // avoid mutating the original array
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 20); // Get top 10 latest movies
}

  return (
    <>
      <HorizontalScroller title="Latest Movies">
        {latestMovie.map((movie) => (
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

export default LatestRelease;
