import { useEffect, useState } from "react";

import SideBar from "../components/SideBar";
import Carousel from "../components/Homecom/Carousel";
import Footer from "../components/Footer";
import Popular from "../components/Homecom/Popular";
import Recommendation from "../components/Homecom/Recommendation";
import LatestRelease from "../components/Homecom/LatestRelease";
import GenreList from "../components/Homecom/GenresList";
import Trending from "../components/Homecom/Trending";
import { useDispatch, useSelector } from "react-redux";
import { uiConfigApi } from "../redux/apis";
import { uiData } from "../redux/slice/uiConfigSlice";

// Map of available component JSX
const componentMap = {
  LatestRelease: <LatestRelease />,
  Popular: <Popular />,
  Trending: <Trending />,
  GenreList: <GenreList />,
  Recommendation: <Recommendation />
};

const Home = () => {
  const [layoutConfig, setLayoutConfig] = useState([]);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.uiConfig);

  useEffect(() => {
    if(!data)dispatch(uiData());
  }, [dispatch]);

  useEffect(() => {
    if (data?.homeComponents) {
      const enabledComponents = Object.entries(data.homeComponents)
        .filter(([_, config]) => config.enabled)
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([name]) => name);

      setLayoutConfig(enabledComponents);
    }
  }, [data]);

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>
      <div className="flex-1 overflow-x-hidden z-0">
        <Carousel />
        <div className="pl-30 px-6 py-8">
          {layoutConfig.map((name, idx) => (
            <div key={idx}>
              {name === "GenreList" && (
                <p className="text-2xl font-semibold px-6">Genre</p>
              )}
              {componentMap[name]}
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};


export default Home;
