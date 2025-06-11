import React, { useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import {useEffect , useState } from "react"

function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeScreen;
}

const StaticCard = forwardRef(({ data, onHover, onLeave }, forwardedRef) => {
  const navigate=useNavigate();
  const cardRef = useRef();
  const timeoutRef = useRef(null);
  
  const isLargeScreen = useIsLargeScreen();


  const handleMouseEnter = () => {
    if(isLargeScreen){
    const rect = cardRef.current.getBoundingClientRect();
    timeoutRef.current = setTimeout(() => {
      onHover(
        data,
        {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        cardRef
      );
    }, 300); // Delay of 300ms
  }
  };
   const handleMouseClick = () => {
    console.log(data);
   navigate(`/movie/${data.movieId}`);
  };

  const handleMouseLeave = () => {
    if(isLargeScreen){
    clearTimeout(timeoutRef.current);
    if (onLeave) onLeave();}
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
      onClick={handleMouseClick}
      className="max-sm:h-[200px] max-sm:w-[120px] w-[210px] h-[300px] bg-zinc-800 rounded overflow-hidden flex-shrink-0"
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
