import React, { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import debounce from "lodash.debounce"; 
import SideBar from "../components/SideBar";
import TwoThumbSlider from "../components/Searchcom/TwoThumbSlider";
import Typography from "@mui/material/Typography";
import MovieGrid from "../components/Rows/MoviesGrid";
import { fetchSearchResults } from "../redux/slice/searchSlice";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const GENRE_OPTIONS = ["Action", "Adventure", "Animation", "Biography", 
    "Comedy", "Crime", "Drama", "Family", "Fantasy", "History", "Horror", 
    "Music", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western"];

const SearchPage = () => {
  
  const dispatch = useDispatch();
  const { movies, suggestions, isLoading, hasMore, page } = useSelector((state) => state.search);
  
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const debouncedFetchMovies = useCallback(
    debounce((query, genre, ratingMin, ratingMax) => {
      dispatch(fetchSearchResults({ query, genre, ratingMin, ratingMax, page: 1 }));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
      debouncedFetchMovies(searchText, selectedGenre, ratingRange[0], ratingRange[1]);
  }, [searchText, selectedGenre, ratingRange, debouncedFetchMovies]);

   const observer = useRef();

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchSearchResults({
            query: searchText,
            genre: selectedGenre,
            ratingMin: ratingRange[0],
            ratingMax: ratingRange[1],
            page: page + 1,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, dispatch, searchText, selectedGenre, ratingRange, page]
  );
    const handleSearchInput = (e) => setSearchText(e.target.value);
    const handleRatingChange = (val) => setRatingRange(val);
    const handleSuggestionClick = (suggestion) => {
      setSelectedGenre("");
      setRatingRange([0, 10]);
      setSearchText(suggestion);
    };


  return (
    <div className="max-sm:pt-20 max-sm:pl-2 pl-20 max-sm:pr-2 w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-black via-zinc-900 to-black pt-10 pr-5 text-white relative">
      <div className="fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-3xl mx-auto mb-10">
        <div className="flex items-center border border-gray-700 bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <span className="px-3 text-red-600">
            <Search className="w-6 h-6" />
          </span>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchInput}
            placeholder="Search movies..."
            className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Genre & Rating Filter */}
      <div className="w-full max-w-5xl mx-auto bg-zinc-900 p-5 rounded-xl shadow-xl mb-8 flex flex-wrap items-center justify-between gap-6 z-10 relative">
        <select
          className="bg-black border border-gray-700 text-white p-2 rounded-md"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-4">
          <Typography className="text-white">Rating:</Typography>
          <TwoThumbSlider value={ratingRange} onChange={handleRatingChange} />
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 px-4 max-w-5xl mx-auto z-0 relative">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s)}
              className="bg-zinc-800 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition shadow"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Movies Grid */}
      <div className="container mx-auto  px-4 sm:px-8 lg:px-20 z-20 relative">
        <MovieGrid movies={movies} lastMovieRef={lastMovieRef} />
      </div>
      {isLoading && (
        <div className="text-center mt-4 text-gray-400">Loading more...</div>
      )}
      {/* No Movies Found Message */}
       {!isLoading && movies?.length === 0 && searchText.trim() !== "" && (
        <div className="text-center text-gray-400 mt-10 w-full">
          No movies found for "{searchText}"
        </div>
      )}
      <br></br>
    </div>
    
  );
};


export default SearchPage;
