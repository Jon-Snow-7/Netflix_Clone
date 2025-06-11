import "./App.css";
import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import MySpace from "./pages/MySpace";
import MySpaceAdmin from "./pages/MySpaceAdmin";
import SearchPage from "./pages/SearchPage";
import SearchPageAdmin from "./pages/SearchPageAdmin";
import WatchHistory from "./pages/WatchHistory";
import WatchHistoryAdmin from "./pages/WatchHistoryAdmin";
import MovieDetail from "./components/MovieDetail";
import GenrePage from "./pages/Genre";
import GenrePageAdmin from "./pages/GenreAdmin";
import AddMovies from "./pages/AddMovies";
import ListMovies from "./components/Moviescom/ListMovies";
import ListMoviesAdmin from "./components/Moviescom/ListMoviesAdmin";
import Profiles from "./pages/Profiles";
import ManageProfiles from "./pages/ManageProfiles";
import { Navigate } from "react-router-dom";

import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Lazy load pages/components
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const MySpace = lazy(() => import("./pages/MySpace"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const WatchHistory = lazy(() => import("./pages/WatchHistory"));
const MovieDetail = lazy(() => import("./components/MovieDetail"));
const GenrePage = lazy(() => import("./pages/Genre"));
const AddMovies = lazy(() => import("./pages/AddMovies"));
const ListMovies = lazy(() => import("./components/Moviescom/ListMovies"));
const Profiles = lazy(() => import("./pages/Profiles"));
const ManageProfiles = lazy(() => import("./pages/ManageProfiles"));

// import { useDispatch } from "react-redux";
// import { decrement, increment } from "./components/CounterSlice";
const ADMIN_EMAIL = "admin@nobroker.in";
function App() {
  const location = useLocation();
  const showBG = location.pathname === "/" || location.pathname === "/register";
  const containerClass = showBG
    ? "w-screen h-screen bg-[url('../public/images/netflixbg.jpg')]"
    : "w-screen h-screen";

  const token = localStorage.getItem("token");

  const decodedEmail = useMemo(() => {
    try {
      if (!token) return null;
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload?.sub || null; // or payload.email depending on your backend
    } catch (e) {
      return null;
    }
  }, [token]);
  
  const isLoggedIn = !!localStorage.getItem("token"); // converts to true/false
  const isAdmin = decodedEmail === ADMIN_EMAIL;

  const PrivateRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <div className={containerClass}>
      <div className="overflow-hidden">
        <Suspense fallback={<div className="text-center mt-20 text-white">Loading...</div>}>
          <Routes>
            {/* Always accessible */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}

            <Route
              path="/profiles"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Profiles />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage_profiles"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <ManageProfiles />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/myspace"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <MySpace />
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <SearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <WatchHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <AddMovies />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <MovieDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/allmovies"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <ListMovies />
                </PrivateRoute>
              }
            />
            <Route
              path="/genre/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <GenrePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
