//import React from "react";
import SideBar from "../components/SideBar";

import Carousel from "../components/Carousel";
import ContinueWatching2 from "../components/ContinueWatching";
import Footer from "../components/Footer";
import Popular from "../components/Popular";
import Recommendation from "../components/Recommendation";
import LatestRelease from "../components/LatestRelease";
const Home = () => {
  return (
    <>
      <div className="flex min-h-screen bg-black text-white overflow-hidden">
        <div className=" fixed top-0 left-0 h-screen  z-50">
        <SideBar />
        </div>
        <div className="flex-1 overflow-x-hidden z-0">
          <Carousel />
          <br></br>
          <br></br>
          <div className="pl-30 px-6 py-8">
          {/* <ContinueWatching2 /> */}
          
          <LatestRelease />
         
          <Popular />
          
          <Recommendation />
          </div>
          <Footer/>
        </div>
        
      </div>
    </>
  );
};

export default Home;
