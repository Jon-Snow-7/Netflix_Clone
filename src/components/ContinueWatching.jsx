// components/ContinueWatching.jsx
import React, { useEffect } from 'react';
import HorizontalScroller from './HorizontalScroller';
import { useDispatch,useSelector } from 'react-redux';
import { continueData } from '../redux/slice/continueSlice';

const ContinueWatching = () => {
  const dispatch=useDispatch();
  const continueWatchingState=useSelector((state)=>state.continue);

  useEffect(()=>{
    dispatch(continueData());
  },[])
  const continueWatching=continueWatchingState?.data?.results || [];

  return (
    <HorizontalScroller title="Continue Watching"  >
      {continueWatching.map((movie) => (
        <div key={movie.id} className="min-w-[180px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md w-full h-60 object-cover"
          />
          <p className="mt-2 text-sm text-white">{movie.title}</p>
          <br></br>
        <br></br>
        </div>
        
      ))}
    </HorizontalScroller>
  );
};

export default ContinueWatching;
