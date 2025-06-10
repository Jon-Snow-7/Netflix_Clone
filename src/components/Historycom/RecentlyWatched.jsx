import React, { useEffect} from 'react';
import MovieRow from '../Rows/MovieRow';
import { useDispatch, useSelector } from 'react-redux';
import { recentMovieData } from '../../redux/slice/recentlyWatchSlice';

const RecentlyWatched = () => {
  const dispatch = useDispatch();
  const recentMovieState = useSelector((state) => state.recent);

  useEffect(() => {
    dispatch(recentMovieData());
  }, [dispatch]);

  const recentMovie = recentMovieState?.data || [];
  console.log(recentMovieState);
  return (
    <MovieRow movies={recentMovie} title="Recent Movies"  className="mb-8" />
  );
};

export default RecentlyWatched;
