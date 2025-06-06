import React, { useState, useEffect, useRef } from "react";
import StaticCard from "./StaticCard";
import GridHoverCard from "./GridHoverCard";

const MovieGrid = ({ movies }) => {
  const [hoverData, setHoverData] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const staticCardRef = useRef(null);
  const hoverCardRef = useRef(null);

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
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  };

  return (
    <div className="relative bg-black text-white p-6 justify-center">

      {/* Grid Movie Layout */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        {movies.map((movie) => (
          <StaticCard
            key={movie.movieId}
            data={movie}
            onHover={handleHover}
          />
        ))}
      </div>

      {/* HoverCard */}
      <GridHoverCard
        data={hoverData}
        position={hoverPosition}
        isVisible={isVisible}
        hoverCardRef={hoverCardRef}
      />
    </div>
  );
};

export default MovieGrid;
