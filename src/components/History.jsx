import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyData } from "../redux/slice/historySlice";
import HistoryRow from "./HistoryRow";
import { getMovieById } from "../redux/apis";

const History = () => {
  const dispatch = useDispatch();
  const { data: history = [] } = useSelector((state) => state.history);

  const [movies, setMovies] = useState([]);

  // Fetch history data on mount
  useEffect(() => {
    dispatch(historyData());
  }, [dispatch]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (history.length) {
        const movieDetails = await Promise.all(
          history.map((item) => getMovieById(item.movieId))
        );
        setMovies(movieDetails);
      }
    };

    fetchMovies();
  }, [history]);

  return (
    <HistoryRow
      movies={movies}
      title="Watch History"
      className="mb-8"
    />
  );
};

export default History;