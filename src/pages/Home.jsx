import React from "react";
import SideBar from "../components/SideBar";

import Carousel from "../components/Carousel";
import ContinueWatching from "../components/ContinueWatching";
const Home = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div>
          <Carousel />
          <ContinueWatching />
        </div>
      </div>
    </>
  );
};

export default Home;
