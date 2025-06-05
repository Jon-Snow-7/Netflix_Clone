import React, { useRef } from "react";

const StaticCard = ({ data, onHover, onLeave }) => {
  const cardRef = useRef();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    const rect = cardRef.current.getBoundingClientRect();
    timeoutRef.current = setTimeout(() => {
      onHover(data, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
      }, cardRef);
    }, 500); // Delay of 1000ms
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    if (onLeave) onLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-[200px] h-[300px] bg-zinc-800 rounded overflow-hidden flex-shrink-0 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-95 shadow-md hover:shadow-xl"
    >
      <img
        src={data.moviePoster}
        alt={data.movieName}
        className="w-full h-full object-cover transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default StaticCard;
