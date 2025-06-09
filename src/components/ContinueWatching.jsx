// components/ContinueWatching.jsx
import React, { useEffect } from 'react';
import HorizontalScroller from './HorizontalScroller';
import { useDispatch,useSelector } from 'react-redux';
import { continueData } from '../redux/slice/continueSlice';
//import MovieRow from './MovieRow';
import MovieCard from './MovieCard';

const ContinueWatching = () => {
  const dispatch=useDispatch();
  const continueWatchingState=useSelector((state)=>state.continue);

  useEffect(()=>{
    dispatch(continueData());

  },[dispatch])
  const continueWatching=continueWatchingState?.data?.results || [];
  console.log(continueWatching);

  return (
   
     <HorizontalScroller title="Continue Watching">
      {continueWatching.map((movie) => (
        <MovieCard key={movie.movieId} data={movie} />
      ))}
    </HorizontalScroller>
  );
};

export default ContinueWatching;
