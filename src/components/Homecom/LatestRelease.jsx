import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestMovieData } from "../../redux/slice/latestmovieSlice";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const LatestRelease = ({ className }) => {
  const dispatch = useDispatch();
  const latestState = useSelector((state) => state.latest);

  useEffect(() => {
    dispatch(latestMovieData());
  }, [dispatch]);

  let latestMovie = latestState?.data?.content || [];

  return (
    <Suspense fallback={<div className="text-white">Loading Latest Movies...</div>}>
      <MovieRow movies={latestMovie} title="Latest Movies" className={className || "mb-8"} />
    </Suspense>
  );
};

export default LatestRelease;
