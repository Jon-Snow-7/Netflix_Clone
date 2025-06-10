import React, { useEffect } from "react";
import MoviesGrid from "../Rows/MoviesGrid"; // Import MovieDetail for modal
import { useDispatch, useSelector } from "react-redux";
import { recommendationMovieData } from "../../redux/slice/recommendationSlice";
import SideBar from "../SideBar";
const ListMovies = () => {
  const dispatch=useDispatch();
  const recommendMovieState=useSelector((state)=>state.recommend)

  useEffect(() => {
    dispatch(recommendationMovieData());
  }, [dispatch]);

  const allmovies =recommendMovieState?.data || [];

  return (
    <div className="pl-20 w-full min-h-screen overflow-x-hidden bg-black pt-10 pl-5 pr-5">
      <div className=" fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>
      <h1 className="flex justify-center font-bold text-red-500 mb-6">Movies</h1>
      {/* Movies Grid */}
      <div className="flex flex-wrap gap-10 justify-center">
        <MoviesGrid movies={allmovies} />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default ListMovies;
