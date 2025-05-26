// import React, { useEffect, useState } from "react";
// import { Search } from "lucide-react";
// const SearchPage = () => {
//   const [searchMovies, setSearchMovies] = useState([]);

//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTA4Yjg1Mjk1MWU3Y2E2ZGQ3MzVmYThiNTY3YTVkMSIsIm5iZiI6MTc0ODIzNTkwOC4zOTEsInN1YiI6IjY4MzNmNjg0NjQwZTA1YjQyOGI2YjY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rdbH2eEITaibx54aA7ewdc6DSSXuOPp7tF06kidgFc",
//     },
//   };

//   useEffect(() => {
//     fetch(
//       "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
//       options
//     )
//       .then((res) => res.json())
//       .then((res) => setSearchMovies(res.results))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="relative w-full p-10">
       
      
//       <span className="absolute bottom-1 pl-15 flex items-center pointer-events-none">
//         <Search className="text-gray-400 w-5 h-5" />
//       </span>
//       <input
//         type="text"
//         placeholder="Search movies..."
//         className="pl-15 pr-4 py-2 w-full rounded-md border border-gray-300 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
       
//       <div className="flex flex-wrap gap-10">
//         {searchMovies.map((movie,index)=>(
//             movie.original_language==="en"?
//             <div key={index}>
//                 <img src={`https://image.tmdb.org/t/p/w300`+movie.backdrop_path} alt="" />
//                 <div>
//                      {movie.original_title}
//                 </div>
               
//             </div>:null
//         ))} 

//       </div>
//       {console.log(searchMovies)}
//     </div>
//   );
// };

// export default SearchPage;

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);

  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTA4Yjg1Mjk1MWU3Y2E2ZGQ3MzVmYThiNTY3YTVkMSIsIm5iZiI6MTc0ODIzNTkwOC4zOTEsInN1YiI6IjY4MzNmNjg0NjQwZTA1YjQyOGI2YjY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rdbH2eEITaibx54aA7ewdc6DSSXuOPp7tF06kidgFc",
    },
  };

  useEffect(() => {
    const fetchMultiplePages = async (startPage = 1, endPage = 5) => {
      const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      );

      try {
        const responses = await Promise.all(
          pageNumbers.map((page) =>
            fetch(
              `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
              options
            ).then((res) => res.json())
          )
        );

        const allMovies = responses.flatMap((res) => res.results);
        setSearchMovies(allMovies);
      } catch (error) {
        console.error("Error fetching multiple pages:", error);
      }
    };

    fetchMultiplePages(1,2);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black pt-10 pl-5 pr-5">
      {/* Search Input with Icon */}
      <div className="relative w-full mb-8">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search movies..."
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Movies Grid */}
      <div className="flex flex-wrap gap-10 justify-center">
        {searchMovies.map((movie, index) =>
          movie.original_language === "en" ? (
            <div
              key={index}
              className="max-w-xs w-full flex flex-col items-center text-white"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.original_title}
                className="rounded-lg w-full object-cover"
              />
              <div className="mt-2 text-center font-semibold">
                {movie.original_title}
              </div>
            </div>
          ) : null
        )}
      </div>
      {console.log(searchMovies)}

      {/* <Footer /> */}
    </div>
  );
};

export default SearchPage;
