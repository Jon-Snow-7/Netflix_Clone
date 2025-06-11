import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommendationMovieData } from "../../redux/slice/recommendationSlice";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const Recommendation = () => {
  const dispatch = useDispatch();
  const recommendMovieState = useSelector((state) => state.recommend);

  useEffect(() => {
    dispatch(recommendationMovieData());
  }, [dispatch]);

  const recommendation = recommendMovieState?.data || [];

  return (
    <Suspense fallback={<div className="text-white">Loading Recommendations...</div>}>
      <MovieRow movies={recommendation} title="Recommended Movies" className="mb-8" />
    </Suspense>
  );
};

export default Recommendation;
