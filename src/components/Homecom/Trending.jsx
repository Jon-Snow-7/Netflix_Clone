import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trendingData } from '../../redux/slice/trendingSlice';

// Lazy load MovieRow
const MovieRow = lazy(() => import('../Rows/MovieRow'));

const Trending = () => {
  const dispatch = useDispatch();
  const trendingState = useSelector((state) => state.trending);

  useEffect(() => {
    dispatch(trendingData());
  }, []);
  const trending=trendingState?.data?.content || [];

  return (
    <Suspense fallback={<div className="text-white">Loading Trending...</div>}>
      <MovieRow movies={trending} title="Trending Now" className="mb-8" />
    </Suspense>
  );
};

export default Trending;
