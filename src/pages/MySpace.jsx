import React from 'react';
import Watchlist from '../components/Watchlist';
import ContinueWatching2 from '../components/ContinueWatching';
import SideBar from '../components/SideBar';
import History from '../components/History';
const MySpace = () => {
  const username = 'John Doe';

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      {/* Sidebar (always visible on left) */}
      <div className=" fixed top-0 left-0 h-screen bg-gray-900 z-50">
         <SideBar />
      </div>
   

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden z-0">
        {/* Header with background image */}
        <div
          className="w-full h-[30vh] bg-cover bg-center relative z-10"
          style={{
            backgroundImage: `url('images/two.webp')`,
          }}
        >
          <div className="absolute inset-0  bg-opacity-60 px-8 py-6 flex flex-col justify-between">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <h1 className="px-30 py-25 text-4xl font-bold">Hello, {username}</h1>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    window.location.href = '/';
                  }
                }}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-lg shadow-lg "
              >
                Logout
              </button>
            </div>

            
            
          </div>
        </div>

        {/* Continue Watching below header */}
        <div className="pl-30 px-6 py-8">
              <Watchlist />
        </div>
        <div className="pl-30 px-6 py-8">
          <ContinueWatching2 />
        </div>
        <div className="pl-30 px-6 py-8">
          <History />
        </div>
      </div>
    </div>
  );
};

export default MySpace;
