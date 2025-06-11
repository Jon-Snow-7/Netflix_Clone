import React, { useEffect } from "react";
import MovieRow from "../Rows/MovieRow"; // Import MovieDetail for modal
import { useDispatch, useSelector } from "react-redux";
import { recommendationMovieData } from "../../redux/slice/recommendationSlice";

const Recommendation = () => {
  const dispatch=useDispatch();
  const recommendMovieState=useSelector((state)=>state.recommend)
  const recommendation =recommendMovieState?.data?.content || [];

  useEffect(() => {
    if(!recommendation || recommendation.length==0)dispatch(recommendationMovieData());
  }, [dispatch]);


  return (
    <MovieRow movies={recommendation} title="Recommended Movies"  className="mb-8" />
  );
};

export default Recommendation;
