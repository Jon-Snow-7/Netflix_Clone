import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../../redux/slice/watchlistSlicePost";
import { isInWatchlist } from "../../redux/apis";
import { addToWatchHistory } from "../../redux/slice/historySlicePost";

const HoverCard = ({ data, position, isVisible, hoverCardRef }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [shouldRender, setShouldRender] = useState(false);
  const [scaleIn, setScaleIn] = useState(false);
  const location = useLocation();
  const isOnWatchlistPage = location.pathname === "/watchlist"; // more accurate
  const [isWatchlisted, setIsWatchlisted] = useState(isOnWatchlistPage);
  const [checkLoading, setCheckLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleToggleWatchlist = async () => {
    if (checkLoading) return;
  
    try {
      const isAlreadyInWatchlist = await isInWatchlist(data.movieId);
  
      if (isAlreadyInWatchlist) {
        setPopupMessage("ℹ️ Already in watchlist.");
      } else {
        dispatch(addToWatchlist(data.movieId));
        setIsWatchlisted(true);
        setPopupMessage("✅ Movie added to watchlist!");
      }
    } catch (error) {
      console.error("Error checking/adding to watchlist:", error);
      setPopupMessage("❌ Failed to update watchlist.");
    }
  
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);
  };
  
  useEffect(() => {
      const fetchWatchlistStatus = async () => {
        console.log(data);
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

  if (!shouldRender || !position) return null;

  const CARD_WIDTH = position.width + 150;
  const CARD_HEIGHT = position.height + 200;

  const handleToggleWatchHistory = async () => {
    if (checkLoading) return;

    try {
      dispatch(addToWatchHistory(data.movieId));
      navigate(`/movie/${data.movieId}`);
    } catch (error) {
      console.error("Error checking/adding to watch history:", error);
      setPopupMessage("❌ Failed to update watch history.");
    }

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };
  const currentURL = window.location.href;

  let valuet;
  let valuel;
  if (currentURL.includes("/genre") || currentURL.includes("/allmovies")) {
    valuet = 200;
    valuel = 303;
  } else {
    valuet = 363;
    valuel = 353;
  } 
  return (

    <div
      ref={hoverCardRef}
      className={`absolute z-[99999] rounded-xl overflow-hidden shadow-2xl ${
        scaleIn ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        top: position.top - valuet + window.scrollY,
        left: position.left - valuel + window.scrollX,
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
              {dayjs(data.releaseDate).format("YYYY")}
            </span>
            <span className="text-yellow-400 text-sm">⭐ {data.rating}/10</span>
            <span className="text-gray-300 text-sm">{data.runTime}s</span>
          </div>
          <p className="line-clamp-2 mt-2 text-sm text-gray-200">
            {data.description}
          </p>
          <div className="flex gap-6 mt-6 justify-center">
            <button
              onClick={handleToggleWatchHistory}
              className="flex items-center gap-3 bg-white hover:bg-gray-400 text-black active:scale-95 transition-all duration-300 shadow-xl px-7 py-3 rounded-2xl font-bold text-base hover:shadow-2xl"
            >
              <span className="text-1xl">▶</span>
              <span className="tracking-wide">Watch Now</span>
            </button>
            <button 
            onClick={handleToggleWatchlist}
            className="flex items-center gap-3 bg-white hover:bg-gray-400 text-black active:scale-95 transition-all duration-300 shadow-xl px-7 py-3 rounded-2xl font-bold text-base hover:shadow-2xl">
              <span className="text-2xl">+</span>
              <span className="tracking-wide">Add</span> 
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

export default HoverCard;
