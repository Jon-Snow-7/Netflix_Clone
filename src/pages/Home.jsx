import React, { lazy, Suspense } from "react";
import FadeInSection from "../components/FadeInSection";

// Lazy load all components
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

const Home = () => {
  return (
    <Suspense
      fallback={
        <div className="text-white text-center mt-20">Loading Home...</div>
      }
    >
      <div className="flex min-h-screen bg-black text-white overflow-hidden">
        <div className="fixed top-0 left-0 h-screen z-50">
          <SideBar />
        </div>
        <div className="flex-1 overflow-x-hidden z-0">
          <Carousel />
          <div className="pl-30 px-6 py-8">
            <FadeInSection>
              <LatestRelease />
            </FadeInSection>

            <FadeInSection>
              <Popular />
            </FadeInSection>

            <FadeInSection>
              <Trending />
            </FadeInSection>
            <p className="text-2xl font-semibold px-6">Genre</p>
            <FadeInSection>
              <GenreList />
            </FadeInSection>

            <FadeInSection>
              <Recommendation />
            </FadeInSection>
          </div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
