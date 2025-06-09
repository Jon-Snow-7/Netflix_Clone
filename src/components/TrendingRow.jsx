import React, { useState, useEffect, useRef } from "react";
import StaticCard from "./StaticCard";
import TrendingHoverCard from "./TrendingHoverCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TrendingCard from "./TrendingCard";
const TrendingRow = ({ movies, title }) => {
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
     // document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      //document.body.style.overflow = "auto";
    };
  }, [hoverData]);

  const handleHover = (data, position, ref) => {
    setHoverData(data);
    setHoverPosition(position);
    //setIsVisible(true);
    staticCardRef.current = ref.current;
    setTimeout(() => {
    setIsVisible(true);
  }, 50);
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

    // Give scroll time to update before checking
    setTimeout(() => updateScrollVisibility(), 200);
  };

  const updateScrollVisibility = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10); // 10px buffer
  };

  useEffect(() => {
    updateScrollVisibility(); // Check on mount
    const ref = scrollRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", updateScrollVisibility);
    return () => ref.removeEventListener("scroll", updateScrollVisibility);
  }, []);

  return (
    <div className="relative bg-black text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {
      <div
        onClick={() => scroll("left")}
        className="hidden md:block absolute top-0 left-0 h-full w-16 z-50 cursor-pointer bg-gradient-to-r hover:bg-black/50 bg-black/10 to-transparent"
      >
        <div className="flex items-center justify-center h-full">
          <ChevronLeft className="text-white w-10 h-10" />
        </div>
      </div>
    }


      {/* Right Scroll Zone */}
      {
        <div
          onClick={() => scroll("right")}
          className="hidden md:block absolute top-0 right-0 h-full w-16 z-50 cursor-pointer bg-gradient-to-l hover:bg-black/50 bg-black/10 to-transparent"
        >
          <div className="flex items-center justify-center h-full">
            <ChevronRight className="text-white w-10 h-10" />
          </div>
        </div>
      }
      
        <div
          ref={scrollRef}
          className="flex gap-8 no-scrollbar scroll-smooth"
          style={{ overflowX: "hidden" }}
        >
          {title !== "Trending Now" ? (
            movies.map((movie, index) => (
              <StaticCard key={index} data={movie} onHover={handleHover} />
            ))
          ) : (
            movies.map((movie, index) => (
              <TrendingCard key={index} data={movie} index={index} onHover={handleHover} />
            ))
          )}
        </div>

      
      {/* HoverCard */}
      <TrendingHoverCard
        data={hoverData}
        position={hoverPosition}
        isVisible={isVisible}
        hoverCardRef={hoverCardRef}
      />
    </div>
  );
};

export default TrendingRow;
