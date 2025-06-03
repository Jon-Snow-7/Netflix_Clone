// // components/History.jsx
// import React, { useEffect, useState } from 'react';
// import HorizontalScroller from './HorizontalScroller';
// import axios from 'axios';

// const RecentlyWatched = () => {
//   const [history, setHistory] = useState([]);
//   const API_KEY = '20ac0341ec5b2096d68f9c473d7b5d69';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
//         );
//         setHistory(res.data?.results?.slice(12, 16) || []);
//       } catch (err) {
//         console.error("Failed to fetch history movies:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     // return in a order 
//     <HorizontalScroller title="Recently Watched">
//       {history.map((movie) => (
//         <div key={movie.id} className="min-w-[180px]">
//           {movie.poster_path ? (
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="rounded-md w-full h-60 object-cover"
//             />
//           ) : (
//             <div className="w-full h-60 bg-gray-700 rounded-md flex items-center justify-center">
//               <p className="text-white">No Image</p>
//             </div>
//           )}
//           <p className="mt-2 text-sm text-white">{movie.title}</p>
//         </div>
//       ))}
//     </HorizontalScroller>
//   );
// };

// export default RecentlyWatched;



// components/History.jsx
import React, { useEffect, useState } from 'react';
import HorizontalScroller from './HorizontalScroller';
import axios from 'axios';
import MovieDetail from './MovieDetail'; // Import MovieDetail for modal

const RecentlyWatched = () => {
  const [history, setHistory] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const API_KEY = '20ac0341ec5b2096d68f9c473d7b5d69';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        setHistory(res.data?.results?.slice(12, 16) || []);
      } catch (err) {
        console.error("Failed to fetch history movies:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <HorizontalScroller title="Recently Watched">
        
        {history.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[250px] group relative cursor-pointer"
            onClick={() => setSelectedMovieId(movie.id)}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md w-full h-80 object-cover"
              />
            ) : (
              <div className="w-full h-60 bg-gray-700 rounded-md flex items-center justify-center">
                <p className="text-white">No Image</p>
              </div>
            )}
            <p className="mt-2 text-sm text-white">{movie.title}</p>
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

export default RecentlyWatched;
