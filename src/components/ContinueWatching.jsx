// components/ContinueWatching.jsx
import React, { useEffect, useState } from 'react';
import HorizontalScroller from './HorizontalScroller';
import axios from 'axios';

const ContinueWatching = () => {
  const [continueWatching, setContinueWatching] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=20ac0341ec5b2096d68f9c473d7b5d69`
      );
      setContinueWatching(res.data.results.slice(6, 100)); // Demo Continue Watching
    };
    fetchData();
  }, []);

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
