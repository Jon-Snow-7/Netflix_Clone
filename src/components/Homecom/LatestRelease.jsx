import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestMovieData } from "../../redux/slice/latestmovieSlice";
import MovieRow from "../Rows/MovieRow";
import { latestMovies } from "../../redux/apis";

const LatestRelease = () => {
  const dispatch = useDispatch();
  const latestState = useSelector((state) => state.latest);
  let latestMovie = latestState?.data?.content || [];

  useEffect(() => {
    if(!latestMovies || latestMovie.length==0 )dispatch(latestMovieData());
  }, [dispatch]);


  return (
    <MovieRow movies={latestMovie} title="Latest Movies"  className="mb-8" />
  );
};

export default LatestRelease;
