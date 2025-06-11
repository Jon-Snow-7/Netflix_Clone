import React, { useEffect } from "react";
import MovieRow from "../Rows/MovieRow"; // Import MovieDetail for modal
import { useDispatch, useSelector } from "react-redux";
import { recommendationMovieData } from "../../redux/slice/recommendationSlice";

const Recommendation = () => {
  const dispatch=useDispatch();
  const recommendMovieState=useSelector((state)=>state.recommend)

  useEffect(() => {
    dispatch(recommendationMovieData());
  }, [dispatch]);

  const recommendation =recommendMovieState?.data?.content || [];

  return (
    <MovieRow movies={recommendation} title="Recommended Movies"  className="mb-8" />
  );
};

export default Recommendation;
