import React, { useEffect, useState } from "react"; // import modal component
import { useDispatch, useSelector } from "react-redux";
import { watchlistMovieData } from "../redux/slice/watchlistSlice";
import MovieRow from "./MovieRow";
import { getMovieById } from "../redux/apis"; // import MovieRow component
const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlistState = useSelector((state) => state.watchlist);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    dispatch(watchlistMovieData());
  }, [dispatch]);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      const watchlist = watchlistState?.data || [];

      try {
        const movieData = await Promise.all(
          watchlist.map((movie) => getMovieById(movie.movieId))
        );
        setMovies(movieData);
      } catch (error) {
        console.error("Failed to fetch movies from watchlist:", error);
      }
    };

    if (watchlistState?.data?.length) {
      fetchWatchlistMovies();
    }
  }, [watchlistState]);
  return (
    <MovieRow movies={movies} title="Your Watchlist" className="mb-8" />
  );
};

export default Watchlist;
