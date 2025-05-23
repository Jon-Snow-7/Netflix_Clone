import React, { useState } from 'react';
import {
  Home,
  Search,
  Video,
  Bookmark,
  User,
} from 'lucide-react';

const menuItems = [
  { icon: <Home size={24} />, label: 'Home' },
  { icon: <Search size={24} />, label: 'Search' },
  { icon: <Video size={24} />, label: 'Movies' },
  { icon: <Bookmark size={24} />, label: 'Watchlist' },
  { icon: <User size={24} />, label: 'Profile' },
];

const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`h-screen bg-[#0f0f0f] sticky top-0 text-white transition-all duration-300 ease-in-out shadow-lg
        ${isHovered ? 'w-48' : 'w-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Netflix Logo */}
      <div className="flex items-center justify-center py-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className={`transition-all duration-300 ${isHovered ? 'w-24' : 'w-14'}`}
        />
      </div>

      {/* Centered Menu Items */}
      <div className="h-[100%] flex-1 flex flex-col justify-center items-center gap-20 px-3">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 cursor-pointer p-2 rounded-md hover:bg-[#1f1f1f] transition-colors w-full"
          >
            {item.icon}
            {isHovered && <span className="text-sm font-medium">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
