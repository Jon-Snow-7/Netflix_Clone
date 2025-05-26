

// components/Watchlist.jsx
import React, { useEffect, useState } from 'react';
import HorizontalScroller from './HorizontalScroller';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=20ac0341ec5b2096d68f9c473d7b5d69`
      );
      setWatchlist(res.data.results.slice(0, 6)); // Demo Watchlist
    };
    fetchData();
  }, []);

  return (
    <HorizontalScroller title="Your Watchlist">
      {watchlist.map((movie) => (
        <div key={movie.id} className="min-w-[180px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md w-full h-60 object-cover"
          />
          <p className="mt-2 text-sm text-white">{movie.title}</p>
        </div>
      ))}
    </HorizontalScroller>
  );
};

export default Watchlist;
