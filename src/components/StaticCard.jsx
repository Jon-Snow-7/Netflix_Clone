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
    }, 300); // Delay of 0ms
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
      className="w-[210px] h-[300px] bg-zinc-800 rounded overflow-hidden flex-shrink-0" 
    >
      <img
        src={data.moviePoster}
        alt={data.movieName}
        className="w-full h-full object-cover rounded-10px"
      />
    </div>
  );
};

export default StaticCard;
