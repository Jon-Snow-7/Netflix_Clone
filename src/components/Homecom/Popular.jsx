import React, { useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popularData } from "../../redux/slice/popularSlice";
import { useInView } from "react-intersection-observer";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const Popular = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { data: popular, isLoading, page, hasMore } = useSelector((state) => state.popular);
  const observer = useRef();

  useEffect(() => {
    if (inView && ( !popular || popular.length === 0)) {
      dispatch(popularData({ page: 0, size: 20 }));
    }
  }, [inView, popular]);

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(popularData({ page, size: 20 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, dispatch, page]
  );

  return (
    <div ref={ref} className="min-h-[200px]">
      <Suspense fallback={<div>Loading Popular Movies</div>}>
        {popular.length > 0 ? (
          <MovieRow movies={popular} title="Popular Movies" lastMovieRef={lastMovieRef} />
        ) : (
          <p className="text-gray-400">No Popular Movies Available</p>
        )}
      </Suspense>
    </div>
  );
};

export default Popular;
