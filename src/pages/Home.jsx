//import React from "react";
import SideBar from "../components/SideBar";

import Carousel from "../components/Carousel";
import ContinueWatching2 from "../components/ContinueWatching";
import Footer from "../components/Footer";
import Trending from "../components/Trending";
import Popular from "../components/Popular";
const Home = () => {
  return (
    <>
      <div className="flex min-h-screen bg-black text-white overflow-hidden">
        <div className=" fixed top-0 left-0 h-screen bg-gray-900 z-50">
        <SideBar />
        </div>
        <div className="flex-1 overflow-x-hidden z-0">
          <Carousel />
          <br></br>
          <br></br>
          <div className="pl-30 px-6 py-8">
          <ContinueWatching2 />
          
          <Trending />
         
          <Popular />
          
          <ContinueWatching2 />
          </div>
          <Footer/>
        </div>
        
      </div>
    </>
  );
};

export default Home;
