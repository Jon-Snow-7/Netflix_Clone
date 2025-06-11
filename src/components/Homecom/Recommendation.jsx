// import React, { useEffect, lazy, Suspense } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { recommendationMovieData } from "../../redux/slice/recommendationSlice";

// // Lazy load MovieRow
// const MovieRow = lazy(() => import("../Rows/MovieRow"));

// const Recommendation = () => {
//   const dispatch = useDispatch();
//   const recommendMovieState = useSelector((state) => state.recommend);

//   useEffect(() => {
//     dispatch(recommendationMovieData());
//   }, [dispatch]);

//   const recommendation =recommendMovieState?.data?.content || [];

//   return (
//     <Suspense fallback={<div className="text-white">Loading Recommendations...</div>}>
//       <MovieRow movies={recommendation} title="Recommended Movies" className="mb-8" />
//     </Suspense>
//   );
// };

// export default Recommendation;


import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommendationMovieData } from "../../redux/slice/recommendationSlice";
import { useInView } from "react-intersection-observer";

// Lazy load MovieRow
const MovieRow = lazy(() => import("../Rows/MovieRow"));

const Recommendation = () => {
  const dispatch = useDispatch();
  const recommendMovieState = useSelector((state) => state.recommend);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView && !recommendMovieState?.data) {
      dispatch(recommendationMovieData());
    }
  }, [inView, recommendMovieState?.data]);

  const recommendation = recommendMovieState?.data?.content || [];

  return (
    <div ref={ref} className="min-h-[200px]">
      <Suspense fallback={<div className="text-white">Loading Recommendations...</div>}>
        {recommendation.length > 0 ? (
          <MovieRow movies={recommendation} title="Recommended Movies" className="mb-8" />
        ) : (
          inView && <p className="text-gray-400">No recommendations available.</p>
        )}
      </Suspense>
    </div>
  );
};

export default Recommendation;
