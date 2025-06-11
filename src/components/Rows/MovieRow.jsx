import React, { useState, useEffect, useRef } from "react";
import StaticCard from "../Cards/StaticCard";
import HoverCard from "../Cards/HoverCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TrendingCard from "../Cards/TrendingCard";
import TrendingHoverCard from "../Cards/TrendingHoverCard";
import WatchlistHoverCard from "../Cards/WatchlistHoverCard";

const MovieRow = ({ movies, title, lastMovieRef }) => {
  const [hoverData, setHoverData] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const staticCardRef = useRef(null);
  const hoverCardRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const inStatic = staticCardRef.current?.contains(e.target);
      const inHover = hoverCardRef.current?.contains(e.target);
      if (!inStatic && !inHover) {
        setIsVisible(false);
      }
    };

    if (hoverData) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoverData]);

  const handleHover = (data, position, ref) => {
    setHoverData(data);
    setHoverPosition(position);
    staticCardRef.current = ref.current;
    setTimeout(() => setIsVisible(true), 50);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const amount = 1400;
    const container = scrollRef.current;

    if (direction === "left") {
      container.scrollLeft -= amount;
    } else {
      container.scrollLeft += amount;
    }

    setTimeout(updateScrollVisibility, 200);
  };

  const updateScrollVisibility = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10); // 10px buffer
  };

  useEffect(() => {
    updateScrollVisibility();
    const ref = scrollRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", updateScrollVisibility);
    return () => ref.removeEventListener("scroll", updateScrollVisibility);
  }, []);

  return (
    <div className="relative bg-black text-white p-6 max-sm:p-0 max-sm:pb-5">
      <h2 className="text-2xl max-sm:text-[1.2rem] font-semibold mb-4">{title}</h2>

      {showLeft && (
        <div
          onClick={() => scroll("left")}
<<<<<<< HEAD
          className="hidden md:block absolute top-0 left-0 h-full w-16 z-50 cursor-pointer bg-gradient-to-r from-black to-transparent hover:bg-black/50"
=======
          className="max-sm:hidden absolute top-0 left-0 h-full w-16 z-50 cursor-pointer bg-gradient-to-r hover:bg-black/50 bg-black/10 to-transparent"
>>>>>>> ff1540eac8299a6e9047e9daaa9c65118ea48ca2
        >
          <div className="flex items-center justify-center h-full">
            <ChevronLeft className="text-white w-10 h-10" />
          </div>
        </div>
      )}

      {showRight && (
        <div
          onClick={() => scroll("right")}
<<<<<<< HEAD
          className="hidden md:block absolute top-0 right-0 h-full w-16 z-50 cursor-pointer bg-gradient-to-l from-black to-transparent hover:bg-black/50"
=======
          className="max-sm:hidden absolute top-0 right-0 h-full w-16 z-50 cursor-pointer bg-gradient-to-l hover:bg-black/50 bg-black/10 to-transparent"
>>>>>>> ff1540eac8299a6e9047e9daaa9c65118ea48ca2
        >
          <div className="flex items-center justify-center h-full">
            <ChevronRight className="text-white w-10 h-10" />
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
<<<<<<< HEAD
        className="flex gap-8 no-scrollbar scroll-smooth overflow-x-hidden"
=======
        className="flex gap-6 max-sm:gap-2 no-scrollbar scroll-smooth overflow-hidden  max-sm:overflow-x-auto "
>>>>>>> ff1540eac8299a6e9047e9daaa9c65118ea48ca2
      >
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1;

          if (title === "Trending Now") {
            return (
              <TrendingCard
                key={index}
                data={movie}
                index={index}
                onHover={handleHover}
                ref={isLast ? lastMovieRef : null}
              />
            );
          }

          return (
            <StaticCard
              key={index}
              data={movie}
              onHover={handleHover}
              ref={isLast ? lastMovieRef : null}
            />
          );
        })}
      </div>

      {title === "Trending Now" ? (
        <TrendingHoverCard
          data={hoverData}
          position={hoverPosition}
          isVisible={isVisible}
          hoverCardRef={hoverCardRef}
        />
      ) : title === "Your Watchlist" ? (
        <WatchlistHoverCard
          data={hoverData}
          position={hoverPosition}
          isVisible={isVisible}
          hoverCardRef={hoverCardRef}
        />
      ) : (
        <HoverCard
          data={hoverData}
          position={hoverPosition}
          isVisible={isVisible}
          hoverCardRef={hoverCardRef}
        />
      )}
    </div>
  );
};

export default MovieRow;
