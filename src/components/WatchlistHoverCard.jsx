import React, { useEffect, useState } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../redux/slice/watchlistSlicePost";
import {removeFromWatchlist} from "../redux/slice/watchlistSliceDelete"
import { isInWatchlist } from "../redux/apis";
import dayjs from "dayjs";
import { removeMovieLocally } from "../redux/slice/watchlistSlice";

const WatchlistHoverCard = ({ data, position, isVisible, hoverCardRef }) => {
  const location = useLocation();
  const isOnWatchlistPage = location.pathname === "/watchlist"; // more accurate
  const [isWatchlisted, setIsWatchlisted] = useState(isOnWatchlistPage);
  const [checkLoading, setCheckLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);
  const [scaleIn, setScaleIn] = useState(false);
  
   const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(state => state.watchlist);

  

const handleDelete = async () => {
  try {
    await dispatch(removeFromWatchlist(data.id));
    dispatch(removeMovieLocally(data.id));
    setPopupMessage("Removed from watchlist!");
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      window.location.reload(); // 🔁 force refresh
    }, 1000); // wait a moment for the popup to show
  } catch (error) {
    console.error("Failed to remove movie from watchlist:", error);
    setPopupMessage("Failed to remove.");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  }
};



  useEffect(() => {
    if (data && position) {
      setShouldRender(true);
      setTimeout(() => {
        setScaleIn(true);
      }, 20); // Wait a frame before animating in
    }
  }, [data, position]);

  useEffect(() => {
    if (!isVisible) {
      setScaleIn(false); // Start fade out
      const timeout = setTimeout(() => {
        setShouldRender(false); // Unmount after fade
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      if (!isOnWatchlistPage && data?.movieId) {
        try {
          setCheckLoading(true);
          const result = await isInWatchlist(data.movieId);
          setIsWatchlisted(result);
        } catch (err) {
          console.error("Error checking watchlist:", err);
        } finally {
          setCheckLoading(false);
        }
      } else {
        setCheckLoading(false); // Skip API call, already true
      }
    };
    fetchWatchlistStatus();
  }, [data?.movieId, isOnWatchlistPage]);

  if (!shouldRender || !position) return null;

  const CARD_WIDTH = position.width + 150;
  const CARD_HEIGHT = 500;

  const handleWatchNow = () => {
    navigate(`/movie/${data.movieId}`);
  };
 
  return (
    <div
      ref={hoverCardRef}
      className={`absolute z-[99999] rounded-xl overflow-hidden shadow-2xl ${
        scaleIn ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        top: -20,
        left: position.left - 195,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        maxWidth: "90vw",
        maxHeight: "90vh",
        opacity: scaleIn ? 1 : 0,
        transform: scaleIn ? "scale(1)" : "scale(0.7)",
        transition: "opacity 300ms ease-in-out, transform 400ms ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-visible shadow-md hover:shadow-lg transition-transform">
        <img
          src={data.moviePoster}
          alt={data.movieName}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        />

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/100 to-black/2 rounded-b-3xl z-10" />

        <div className="relative z-20 w-full h-full flex flex-col justify-end p-4 text-white">
          <div className="h-[100px]" />
          <h2 className="text-xl font-bold">{data.movieName}</h2>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">
              {dayjs(data.releaseDate).format("DD MMMM YYYY")}
            </span>
            <span className="text-yellow-400 text-sm">⭐ {data.rating}/10</span>
            <span className="text-gray-300 text-sm">{data.runTime}s</span>
          </div>
          <p className="mt-2 text-sm text-gray-200">
            {data.description.slice(0, 100)}...
          </p>
          <div className="flex gap-6 mt-6 justify-center">
            <button
              onClick={handleWatchNow}
              className="flex items-center gap-3 bg-white hover:bg-gray-400 text-black active:scale-95 transition-all duration-300 shadow-xl px-7 py-3 rounded-2xl font-bold text-base hover:shadow-2xl"
            >
              <span className="text-1xl">▶</span>
              <span className="tracking-wide">Watch Now</span>
            </button>
            <button 
            onClick={handleDelete}
            className="flex items-center gap-3 bg-white hover:bg-gray-400 text-black active:scale-95 transition-all duration-300 shadow-xl px-7 py-3 rounded-2xl font-bold text-base hover:shadow-2xl">
              <span className="text-2xl">-</span>
              <span className="tracking-wide">Delete</span> 
            </button>
            {showPopup && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-xl text-sm z-50 shadow-lg animate-fade-in-out">
              {popupMessage}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistHoverCard;
