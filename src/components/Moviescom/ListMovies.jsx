import React, { useEffect, useRef, useCallback } from "react";
import MoviesGrid from "../Rows/MoviesGrid";
import { useDispatch, useSelector } from "react-redux";
import { allMoviesSliceData } from "../../redux/slice/allMoviesSlice";
import SideBar from "../SideBar";

const ListMovies = () => {
  const dispatch = useDispatch();
  const { movies, isLoading, page, hasMore } = useSelector((state) => state.allMovies);
  const observer = useRef();

  useEffect(() => {
    dispatch(allMoviesSliceData({ page: 0, size: 20 }));
  }, [dispatch]);
  console.log(movies)
  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(allMoviesSliceData({ page: page + 1, size: 20 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, dispatch, page]
  );

  return (
    <div className="pl-20 w-full min-h-screen overflow-x-hidden bg-black pt-10 pl-5 pr-5">
      <div className="fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>
      <h1 className="flex justify-center font-bold text-red-500 mb-6">Movies</h1>

      <div className="flex flex-wrap gap-10 justify-center">
        <MoviesGrid movies={movies} lastMovieRef={lastMovieRef} />
      </div>

      {isLoading && (
        <div className="text-center text-white mt-6">Loading more...</div>
      )}
    </div>
  );
};

export default ListMovies;
