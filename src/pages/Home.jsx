import React, { lazy, Suspense } from "react";
import FadeInSection from "../components/FadeInSection";

// Lazy load all components
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiData } from "../redux/slice/uiConfigSlice";
const SideBar = lazy(() => import("../components/SideBar"));
const Carousel = lazy(() => import("../components/Homecom/Carousel"));
const Footer = lazy(() => import("../components/Footer"));
const Popular = lazy(() => import("../components/Homecom/Popular"));
const Recommendation = lazy(() =>
  import("../components/Homecom/Recommendation")
);
const LatestRelease = lazy(() => import("../components/Homecom/LatestRelease"));
const GenreList = lazy(() => import("../components/Homecom/GenresList"));
const Trending = lazy(() => import("../components/Homecom/Trending"));

// Map of available component JSX
const componentMap = {
  LatestRelease: <LatestRelease />,
  Popular: <Popular />,
  Trending: <Trending />,
  GenreList: <GenreList />,
  Recommendation: <Recommendation />,
};

const Home = () => {
  const [layoutConfig, setLayoutConfig] = useState([]);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.uiConfig);

  useEffect(() => {
    if (!data) dispatch(uiData());
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
            <FadeInSection key={idx} className="mb-8" delay={idx * 0.2}>
              {name === "GenreList" && (
                <p className="text-2xl font-semibold px-6">Genre</p>
              )}
              {componentMap[name]}
            </FadeInSection>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
