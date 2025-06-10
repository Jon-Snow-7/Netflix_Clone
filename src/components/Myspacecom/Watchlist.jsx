import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { watchlistMovieData } from "../../redux/slice/watchlistSlice";
import MovieRow from "../Rows/MovieRow";
import { getMovieById } from "../../redux/apis";

const Watchlist = () => {
  const dispatch = useDispatch();
  const { data: watchlist = [] } = useSelector((state) => state.watchlist);

  // Fetch watchlist data on mount
  useEffect(() => {
    dispatch(watchlistMovieData());
  }, [dispatch]);

  // Use memoized logic to fetch full movie details from TMDB/OMDb
  const [movies, setMovies] = React.useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (watchlist.length) {
        const movieDetails = await Promise.all(
          watchlist.map((item) => getMovieById(item.movieId))
        );
        setMovies(movieDetails);
      }
    };

    fetchMovies();
  }, [watchlist]);

  return (
    <MovieRow
      movies={movies}
      title="Your Watchlist"
      className="mb-8"
    />
  );
};

export default Watchlist;
