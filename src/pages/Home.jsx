import SideBar from "../components/SideBar";
import Carousel from "../components/Homecom/Carousel";
import Footer from "../components/Footer";
import Popular from "../components/Homecom/Popular";
import Recommendation from "../components/Homecom/Recommendation";
import LatestRelease from "../components/Homecom/LatestRelease";
import GenreList from "../components/Homecom/GenresList";
import Trending from "../components/Homecom/Trending";
const Home = () => {
  return (
    <>
      <div className="flex min-h-screen bg-black text-white overflow-hidden">
        <div className=" fixed top-0 left-0 h-screen  z-50">
        <SideBar />
        </div>
        <div className="flex-1 overflow-x-hidden z-0">
          <Carousel />
          <div className="pl-30 px-6 py-8">
          <LatestRelease />
          <Popular />
          <Trending />
          <p className="text-2xl font-semibold px-6">Genre</p>
          <GenreList />
          <Recommendation />
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default Home;
