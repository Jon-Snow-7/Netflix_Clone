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
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
        >
          <ChevronLeft size={24} className='text-black dark:text-white' />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-hidden scrollbar-hide scroll-smooth px-10"
        >
          {children}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
        >
          <ChevronRight size={24} className='text-black dark:text-white'/>
        </button>
      </div>
    </div>
  );
};

export default HorizontalScroller;
