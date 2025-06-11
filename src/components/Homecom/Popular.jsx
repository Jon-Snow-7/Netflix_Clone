import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popularData } from "../../redux/slice/popularSlice";
import { useInView } from "react-intersection-observer";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const Popular = () => {

  const dispatch = useDispatch();
  const popularState = useSelector((state) => state.popular);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView && !popularState?.data && (!popular || popular.length==0 )) dispatch(popularData());
  }, [inView, popularState?.data]);
  const popular = popularState?.data?.content || [];
  // console.log(popular);

  return (
    <div ref={ref} className="min-h-[200px]">
      <Suspense fallback={<div> Loading Popular Movies</div>}>
        {popular.length > 0 ? (
          <MovieRow movies={popular} title="Popular Movies" className="mb-8" />
        ) : (
          inView && <p className="text-gray-400">No Popular Movies Available</p>
        )}
      </Suspense>
    </div>
  );
};

export default Popular;
