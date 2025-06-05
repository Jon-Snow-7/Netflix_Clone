import React, { useState } from 'react';
import { Home, Search, Video, History, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: <Home size={24} />, label: 'Home', path: '/home' },
  { icon: <Search size={24} />, label: 'Search', path: '/search' },
  { icon: <Video size={24} />, label: 'Movies', path: '/movies' },
  { icon: <History size={24} />, label: 'History', path: '/history' },
  { icon: <User size={24} />, label: 'Profile', path: '/myspace' },
];

const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
<div
  className={`
    
   h-screen sticky top-0 flex flex-col
    transition-all duration-300 ease-in-out
    w-13 hover:w-[10vw]
    bg-gradient-to-r from-black/100 to-transparent
     border-r border-white/10 shadow-lg border-none`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
      {/* Logo */}
      <div className="flex items-center  py-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className="w-20 transition-all duration-300"
        />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-8 px-2 mt-20">
        {menuItems.map((item, idx) => (
          <Link
            to={item.path}
            key={idx}
  className="flex items-center gap-4 p-3 rounded-md "
          >
            {/* Icon */}
            <div className="min-w-[24px] text-white">{item.icon}</div>

            {/* Label */}
            <span
              className={`text-sm font-medium text-white whitespace-nowrap transition-opacity duration-300 ease-in-out ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;

