import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import MovieGrid from "../components/Rows/MoviesGrid";
import { genreData, resetGenreData } from "../redux/slice/genreSlice";

const GenrePage = ({ id: propId }) => {
  const params = useParams();
  const id = propId || params.id;
  const observerRef = useRef();

  const dispatch = useDispatch();
  const { data: movies, isLoading, isError, totalPages } = useSelector(
    (state) => state.genre
  );

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(resetGenreData());
    setPage(0);
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(genreData({ genreId: id, page }));
  }, [id, page, dispatch]);

  const loadMoreRef = useCallback((node) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages - 1) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, page, totalPages]);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black pt-10 pl-5 pr-5">
      <div className="fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>

      <h1 className="flex justify-center font-bold text-white mb-6">
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </h1>

      {isError && <div className="text-center text-red-500">Failed to load movies.</div>}

      <div className="flex flex-wrap gap-10 justify-center">
        <MovieGrid movies={movies} />
      </div>

      <div ref={loadMoreRef} className="h-10 mt-5">
        {isLoading && <p className="text-center text-white">Loading more...</p>}
      </div>
    </div>
  );
};

export default GenrePage;
