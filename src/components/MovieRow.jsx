import React, { useState, useEffect, useRef } from "react";
import StaticCard from "./StaticCard";
import HoverCard from "./HoverCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieRow = ({ movies ,title}) => {
  const [hoverData, setHoverData] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const staticCardRef = useRef(null);
  const hoverCardRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const inStatic = staticCardRef.current?.contains(e.target);
      const inHover = hoverCardRef.current?.contains(e.target);
      if (!inStatic && !inHover) {
        setHoverData(null);
        setHoverPosition(null);
        document.body.style.overflow = "auto";
      }
    };

    if (hoverData) {
      document.addEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "auto";
    };
  }, [hoverData]);

  const handleHover = (data, position, ref) => {
    setHoverData(data);
    setHoverPosition(position);
    staticCardRef.current = ref.current;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 1000;
      scrollRef.current.scrollLeft += direction === "left" ? -amount : amount;
    }
  };

  // Left Arrow Icon
const LeftArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M15 18l-6-6 6-6v12z" />
  </svg>
);

// Right Arrow Icon
const RightArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M9 6l6 6-6 6V6z" />
  </svg>
);

  return (
    <div className="relative bg-black text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {/* Scroll Buttons ABOVE HoverCard */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-[50%] z-[100000] bg-black bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition hidden md:block"
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-[50%] z-[100000] bg-black bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition hidden md:block"
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth"
      >
        {movies.map((movie) => (
          <StaticCard
            key={movie.movieId}
            data={movie}
            onHover={handleHover}
          />
        ))}
      </div>

      {/* HoverCard always above everything */}
      <HoverCard
        data={hoverData}
        position={hoverPosition}
        hoverCardRef={hoverCardRef}
      />
    </div>
  );
};

export default MovieRow;
