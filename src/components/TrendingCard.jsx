import React, { useRef } from "react";

const TrendingCard = ({ data, index, onHover, onLeave }) => {
  const cardRef = useRef();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    const rect = cardRef.current.getBoundingClientRect();
    timeoutRef.current = setTimeout(() => {
      onHover(
        data,
        {
          top: rect.top,
          left: rect.left,
          width: rect.width,
        },
        cardRef
      );
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    if (onLeave) onLeave();
  };

  return (
    <div
      className="relative flex items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Large translucent rank number */}
      <div className="absolute -left-2 bottom-0 z-100 text-[250px] font-extrabold text-white opacity-80 leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
        {index + 1}
      </div>

      {/* Movie card overlaid */}
      <div
        ref={cardRef}
        className="relative w-[310px] h-[450px] rounded overflow-hidden flex-shrink-0 bg-zinc-800 z-10 ml-4"
      >
        <img
          src={data.moviePoster}
          alt={data.movieName}
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
};

export default TrendingCard;
