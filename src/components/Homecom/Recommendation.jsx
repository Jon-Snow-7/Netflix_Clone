import React, { useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommendationMovieData } from "../../redux/slice/recommendationSlice";
import { useInView } from "react-intersection-observer";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const Recommendation = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { data, isLoading, hasMore } = useSelector((state) => state.recommend);
  const recommendation = data?.content || [];
  const page = data?.number || 0;

  const observer = useRef();

  useEffect(() => {
    if (inView && (!recommendation || recommendation.length==0)) {
      dispatch(recommendationMovieData({ page: 0, size: 20 }));
    }
  }, [inView, recommendation]);

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(recommendationMovieData({ page: page + 1, size: 20 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page, dispatch]
  );

  return (
    <div ref={ref} className="min-h-[200px]">
      <Suspense fallback={<div className="text-white">Loading Recommendations...</div>}>
        {recommendation.length > 0 ? (
          <MovieRow
            movies={recommendation}
            title="Recommended Movies"
            lastMovieRef={lastMovieRef}
            className="mb-8"
          />
        ) : (
          <p className="text-gray-400">No recommendations available.</p>
        )}
      </Suspense>
    </div>
  );
};

export default Recommendation;
