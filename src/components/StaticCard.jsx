import React, { useRef, forwardRef } from "react";

const StaticCard = forwardRef(({ data, onHover, onLeave }, forwardedRef) => {
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
    }, 300); // Delay of 300ms
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    if (onLeave) onLeave();
  };

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
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
});

export default StaticCard;
