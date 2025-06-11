import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trendingData } from '../../redux/slice/trendingSlice';
import { useInView } from 'react-intersection-observer';

// Lazy load MovieRow
const MovieRow = lazy(() => import('../Rows/MovieRow'));

const Trending = () => {
  const dispatch = useDispatch();
  const trendingState = useSelector((state) => state.trending);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView && !trendingState?.data && (!trending || trending.length==0)) {
      dispatch(trendingData());
    }
  }, [inView, trendingState?.data]);

  const trending = trendingState?.data || [];

  return (
    <div ref={ref} className="min-h-[200px]">
      <Suspense fallback={<div className="text-white">Loading Trending...</div>}>
        {trending.length > 0 ? (
          <MovieRow movies={trending} title="Trending Now" className="mb-8" />
        ) : (
          inView && <p className="text-gray-400">No Trending Movies Available</p>
        )}
      </Suspense>
    </div>
  );
};

export default Trending;
