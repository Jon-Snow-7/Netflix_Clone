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
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
const GenrePage = ({ id: propId }) => {
  const params = useParams();
  const id = propId || params.id;
  const [searchMovies, setSearchMovies] = useState([]);

  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXZqeW90aTU5OEBnbWFpbC5jb20iLCJwcm9maWxlSWQiOjUsImlhdCI6MTc0OTE4NTM2NSwiZXhwIjoxNzQ5MjIxMzY1fQ.g5sDSIfwja6jFuU0zEL4aHV9wZplQ0hKpQvTexrg9I4",
    },
  };

  useEffect(() => {
    const fetchMultiplePages = async (startPage = 1, endPage = 1) => {
      const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      );

      try {
        const responses = await Promise.all(
          pageNumbers.map(() =>
            fetch(
              `http://localhost:8080/api/movies/genre/${id}`,
              options
            ).then((res) => res.json())
          )
        );

        const allMovies = responses.flat();
        setSearchMovies(allMovies);
      } catch (error) {
        console.error("Error fetching multiple pages:", error);
      }
    };

    fetchMultiplePages(1,1);
  }, []);

  return (
    <div className="pl-20 w-full min-h-screen overflow-x-hidden bg-black pt-10 pl-5 pr-5">
      <div className=" fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>
      {/* Movies Grid */}
      <div className="flex flex-wrap gap-10 justify-center">
        {
        searchMovies.map((movie, index) =>
            <div
              key={index}
              className="max-w-xs w-full flex flex-col items-center text-white"
            >
              <img
                src={`${movie.moviePoster}`}
                alt={movie.movieName}
                className="rounded-lg w-full object-cover"
              />
              <div className="mt-2 text-center font-semibold">
                {movie.movieName}
              </div>
            </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default GenrePage;
