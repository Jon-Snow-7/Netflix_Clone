import React, { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import TwoThumbSlider from "../components/TwoThumbSlider";
import Typography from "@mui/material/Typography";

const SearchPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [genres, setGenres] = useState([
  "Western",
  "History",
  "War",
  "Family",
  "Music",
  "Romance",
  "Fantasy",
  "Crime",
  "Biography",
  "Horror",
  "Thriller",
  "Sci-Fi",
  "Mystery",
  "Action",
  "Animation",
  "Drama",
  "Comedy",
  "Adventure"
]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXZqeW90aTU5OEBnbWFpbC5jb20iLCJwcm9maWxlSWQiOjUsImlhdCI6MTc0OTE5MzkxNSwiZXhwIjoxNzQ5MjI5OTE1fQ.B_fijGOKY52LT4lS-oqvTHg2wfqo8_05H5KUCYhvMYY",
    },
  };

  // Fetch filtered movies + suggestions from Spring Boot backend
  const fetchMovies = useCallback(
    debounce(async (query, genre, ratingMin, ratingMax) => {
      try {
        const url = new URL("http://localhost:8080/api/search");
        const sanitizedQuery = query.replace(/[^\w\s]/gi, "").trim(); // removes special chars
        url.searchParams.append("q", sanitizedQuery);
        url.searchParams.append("genre", genre);
        url.searchParams.append("ratingMin", ratingMin);
        url.searchParams.append("ratingMax", ratingMax);

        const res = await fetch(url,options);
        const data = await res.json();

        setSearchMovies(data.movies || []);
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }, 500),
    []
  );

  // Call debounced fetchMovies when filters change
  useEffect(() => {
    fetchMovies(searchText, selectedGenre, ratingRange[0], ratingRange[1]);
  }, [searchText, selectedGenre, ratingRange, fetchMovies]);

  const handleSearchInput = (e) => setSearchText(e.target.value);
  const handleRatingChange = (val) => setRatingRange(val);
  const handleSuggestionClick = (suggestion) => {
    setSelectedGenre("");             // Reset genre
    setRatingRange([0, 10]);    
    setSearchText(suggestion);
  }

  return (
    <div className="pl-20 w-full min-h-screen overflow-x-hidden bg-black pt-10 pl-5 pr-5 text-white">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>

      {/* Search Input */}
      <div className="relative w-full mb-6">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchInput}
          placeholder="Search movies..."
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Genre & Rating Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Genre Dropdown */}
        <select
          className="bg-gray-900 border border-gray-700 p-2 rounded-md"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
          ))}
        </select>

        {/* Rating Slider */}
        <div className="flex items-center gap-4">
          <Typography className="text-white">Rating:</Typography>
          <TwoThumbSlider value={ratingRange} onChange={handleRatingChange} />
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s)}
              className="bg-gray-800 text-sm px-3 py-1 rounded-md hover:bg-gray-700 transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Movies Grid */}
      <div className="flex flex-wrap gap-10 justify-center">
        {searchMovies.map((movie) => (
          <div
            key={movie.movieId}
            className="max-w-xs w-full flex flex-col items-center"
          >
            <img
              src={movie.moviePoster}
              alt={movie.movieName}
              className="rounded-lg w-full object-cover"
            />
            <div className="mt-2 text-center font-semibold">
              {movie.movieName}
            </div>
          </div>
        ))}
      </div>
      {/* No Movies Found Message */}
      {searchMovies.length === 0 && searchText.trim() !== "" && (
        <div className="text-center text-gray-400 mt-10 w-full">
          No movies found for "{searchText}"
        </div>
      )}
    </div>
  );
};

export default SearchPage;
