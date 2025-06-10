import React, { useEffect } from 'react';
import MovieRow from '../Rows/MovieRow'; 
import { useDispatch,useSelector } from 'react-redux';
import { trendingData } from '../../redux/slice/trendingSlice';

const Trending = () => {
  const dispatch=useDispatch();
  const trendingState=useSelector((state)=>state.trending)

  useEffect(() => {
    dispatch(trendingData());
  }, [dispatch]);
  const trending=trendingState?.data || [];

  return (
    <MovieRow movies={trending} title="Trending Now"  className="mb-8" />
  );
};

export default Trending;
