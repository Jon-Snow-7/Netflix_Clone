// components/History.jsx
import React, { useEffect, useState } from 'react';
import HorizontalScroller from './HorizontalScroller';
import axios from 'axios';

const History = ({title="Watch History",size=40}) => {
  const [history, setHistory] = useState([]);
  const API_KEY = '20ac0341ec5b2096d68f9c473d7b5d69';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );

        setHistory(res.data?.results?.slice(12,12+size) || []);
      } catch (err) {
        console.error("Failed to fetch history movies:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <HorizontalScroller title={title}>
      {history.map((movie) => (
        <div key={movie.id} className="min-w-[250px]">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md w-full h-80 object-cover"
            />
          ) : (
            <div className="w-full h-60 bg-gray-700 rounded-md flex items-center justify-center">
              <p className="text-white">No Image</p>
            </div>
          )}
          <p className="mt-2 text-sm text-white">{movie.title}</p>
        </div>
      ))}
    </HorizontalScroller>
  );
};

export default History;
