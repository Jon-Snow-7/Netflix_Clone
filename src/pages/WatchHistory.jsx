import React from 'react'
import History from '../components/History'
//import RecentlyWatched from '../components/RecentlyWatched'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'  
const WatchHistory = () => {
  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
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
              <h1 className="px-30 py-25 text-4xl font-bold">Your Watch History</h1>
            </div>
           </div>
        </div>
        <div className="flex-1 overflow-x-hidden z-0">
            <div className="pl-30 px-6 py-8">
                <History title="Recently Watched" size={5} />
                <History title="Complete History" size={40} />
                <Footer/>
            </div>
        </div> 
    </div>
    </div>
  )
}

export default WatchHistory
