import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestMovieData } from "../../redux/slice/latestmovieSlice";
import { useInView } from "react-intersection-observer";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const LatestRelease = ({ className }) => {
  const dispatch = useDispatch();
  const latestState = useSelector((state) => state.latest);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView && !latestState?.data) dispatch(latestMovieData());
  }, [inView, latestState?.data]);

  let latestMovie = latestState?.data?.content || [];

  return (
    <div ref={ref} className="min-h-[200px]">
      <Suspense
        fallback={<div className="text-white">Loading Latest Movies...</div>}
      >
        {latestMovie.length > 0 ? (
          <MovieRow
            movies={latestMovie}
            title="Latest Movies"
            className={className || "mb-8"}
          />
        ) : (
          inView && <p className="text-gray-400">No Latest Movie Available</p>
        )}
      </Suspense>
    </div>
  );
};

export default LatestRelease;
