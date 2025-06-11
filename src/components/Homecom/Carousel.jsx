import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"; // Optional: use lucide-react icons
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../../redux/slice/watchlistSlicePost";
import { isInWatchlist } from "../../redux/apis";
import { addToWatchHistory } from "../../redux/slice/historySlicePost";

const Carousel = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 37,
      url: "images/Batman.jpg",
      title: "The Batman",
      releaseyear: "2022",
      genre: "Action, Crime",
      rating: "IMDb: 7.8",
      runtime: "176 min",
      plot: "Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.",
    },
    {
      id: 16,
      url: "images/Avenger.jpg",
      title: "Avengers: Endgame",
      releaseyear: "2019",
      genre: "Action, Sci-Fi",
      rating: "IMDb: 8.4",
      runtime: "181 min",
      plot: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    },
    {
      id: 84,
      url: "images/Imitation.jpg",
      title: "The Imitation Game",
      releaseyear: "2014",
      genre: "Biography, Drama, Thriller",
      rating: "IMDb: 8.0",
      runtime: "114 min",
      plot: "During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians while attempting to come to terms with his troubled private life.",
    },
  ];

  const [shouldRender, setShouldRender] = useState(false);
  const [scaleIn, setScaleIn] = useState(false);
  const location = useLocation();
  const isOnWatchlistPage = location.pathname === "/watchlist"; // more accurate
  const [isWatchlisted, setIsWatchlisted] = useState(isOnWatchlistPage);
  const [checkLoading, setCheckLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.watchlist
  );

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const handlePrev = () => {
    setIndex((prev) => (prev + data.length - 1) % data.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 7000);
    return () => clearInterval(intervalRef.current);
  }, []);
  const handleToggleWatchlist = async () => {
    const currentMovie = data[index]; // <-- get the visible movie object

    if (checkLoading) return;

    try {
      const isAlreadyInWatchlist = await isInWatchlist(currentMovie.id);

      if (isAlreadyInWatchlist) {
        setPopupMessage("ℹ️ Already in watchlist.");
      } else {
        dispatch(addToWatchlist(currentMovie.id));
        setIsWatchlisted(true);
        setPopupMessage("✅ Movie added to watchlist!");
      }
    } catch (error) {
      console.error("Error checking/adding to watchlist:", error);
      setPopupMessage("❌ Failed to update watchlist.");
    }

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      const currentMovie = data[index]; // get the currently visible movie

      if (!isOnWatchlistPage && currentMovie?.id) {
        try {
          setCheckLoading(true);
          const result = await isInWatchlist(currentMovie.id);
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
  }, [index, isOnWatchlistPage]); // run whenever the index changes

  const handleWatchNow = ({ index }) => {
    if (index === 1) {
      dispatch(addToWatchHistory(16));
      navigate(`/movie/16`);
    } else if (index === 2) {
      dispatch(addToWatchHistory(84));
      navigate(`/movie/84`);
    } else {
      // Default case or if index is 0
      dispatch(addToWatchHistory(37));
      navigate(`/movie/37`);
    }
  };
  return (
    <div className="pl-30 max-sm:pl-0 max-sm:pt-10 max-sm:pb-5 relative w-screen h-[85vh] max-sm:h-[50vh] max-sm:overflow-x-auto overflow-hidden">
      <div
        className="transition-all duration-700 ease-in-out relative w-full h-full"
        key={index}
      >
        <img
          src={data[index].url}
          alt="slide"
          className="w-screen max-sm:h-[40vh] h-screen object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/30"></div>

        {/* Content */}
        <div className="absolute max-sm:bottom-0 bottom-20 left-10 text-white max-w-xl z-10">
          <h2 className="text-5xl max-sm:text-2xl font-bold mb-4">{data[index].title}</h2>
          <div className="flex max-sm:text-1xl overflow-hidden space-x-6 text-lg mb-2 font-semibold text-gray-300">
            <span>{data[index].releaseyear}</span>
            <span>{data[index].rating}</span>
            <span>{data[index].runtime}</span>
          </div>
          <p className="max-sm:hidden text-sm text-gray-200 mb-6">{data[index].plot}</p>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleWatchNow({index})}
            className="border-2 max-sm:px-3 max-sm:py-2 max-sm:text-base max-sm:rounded-2xl border-white hover:bg-black bg-white text-black hover:text-white font-semibold px-20 py-4 rounded-2xl shadow-md transition duration-300 text-[19.5px] ">
              Watch Now
            </button>

            <div className="relative group">
              <button
                onClick={handleToggleWatchlist}
                className="flex max-sm:px-4 max-sm:py-[0.4rem] max-sm:text-base  items-center gap-3 bg-white hover:bg-gray-400 text-black active:scale-95 transition-all duration-300 shadow-xl px-8 py-4 rounded-2xl font-bold text-base hover:shadow-2xl"
              >
                <span className=" text-2xl">+</span>
                <span className="max-sm:hidden tracking-wide">Add</span>
              </button>
              {showPopup && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-xl text-sm z-50 shadow-lg animate-fade-in-out">
                  {popupMessage}
                </div>
              )}
              <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
                Watchlist
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className=" absolute max-sm:left-0 left-20 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-white/20 backdrop-blur text-white p-3 rounded shadow transition duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="max-sm:right-0 absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-white/20 backdrop-blur text-white p-3 rounded shadow transition duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Carousel;
