import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestMovieData } from "../../redux/slice/latestmovieSlice";
import MovieRow from "../Rows/MovieRow";

const LatestRelease = () => {
  const dispatch = useDispatch();
  const latestState = useSelector((state) => state.latest);

  useEffect(() => {
    dispatch(latestMovieData());
  }, [dispatch]);

  let latestMovie = latestState?.data || [];

  return (
    <MovieRow movies={latestMovie} title="Latest Movies"  className="mb-8" />
  );
};

export default LatestRelease;
