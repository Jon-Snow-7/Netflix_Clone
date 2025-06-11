import React, { useEffect, useCallback, lazy, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestMovieData } from "../../redux/slice/latestmovieSlice";
import { useInView } from "react-intersection-observer";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const LatestRelease = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { data, isLoading, hasMore } = useSelector((state) => state.latest);
  const latestMovie = data?.content || [];
  const page = data?.number || 0;

  const observer = useRef();

  useEffect(() => {
    if (!inView && (!latestMovie || latestMovie.length === 0)) {
      dispatch(latestMovieData({ page: 0, size: 20 }));
    }
  }, [inView, latestMovie]);

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(latestMovieData({ page: page + 1, size: 20 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page, dispatch]
  );

  return (
    <div ref={ref} className="min-h-[200px]">
      <Suspense fallback={<div className="text-white">Loading Latest Movies...</div>}>
        {latestMovie.length > 0 ? (
          <MovieRow
            movies={latestMovie}
            title="Latest Movies"
            lastMovieRef={lastMovieRef}
            className="mb-8"
          />
        ) : (
          <p className="text-gray-400">No Latest Movies Available</p>
        )}
      </Suspense>
    </div>
  );
};

export default LatestRelease;
