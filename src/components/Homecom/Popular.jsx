import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { popularData } from '../../redux/slice/popularSlice';

// Lazy load MovieRow
const MovieRow = lazy(() => import('../Rows/MovieRow'));

const Popular = () => {
  const dispatch = useDispatch();
  const popularState = useSelector((state) => state.popular);

  useEffect(() => {
    dispatch(popularData());
  }, [dispatch]);
  const popular=popularState?.data?.content || [];
  // console.log(popular);

  return (
    <Suspense fallback={<div className="text-white">Loading Popular Movies...</div>}>
      <MovieRow movies={popular} title="Popular Movies" className="mb-8" />
    </Suspense>
  );
};

export default Popular;
