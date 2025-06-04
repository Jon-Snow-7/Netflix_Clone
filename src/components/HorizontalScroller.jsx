// components/HorizontalScroller.jsx
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalScroller = ({ title, children }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollLeft -= 500;
    } else {
      scrollRef.current.scrollLeft += 500;
    }
  };

  return (
    <div className="mb-8 height-200px">
      <h2 className="text-2xl font-semibold mb-3" >{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2   !bg-black  p-2 rounded-full z-40"
        >
          <ChevronLeft size={24} className='text-white bg-black'  />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 px-4 relative z-30 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {children}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute  right-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full !bg-black z-40"
        >
          <ChevronRight size={24} className='text-white bg-black'/>
        </button>
      </div>
    </div>
  );
};

export default HorizontalScroller;
