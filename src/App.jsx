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

function App() {
  const location = useLocation();
  const showBG = location.pathname === "/" || location.pathname === "/register";
  const containerClass = showBG
    ? "w-screen h-screen bg-[url('../public/images/netflixbg.jpg')]"
    : "w-screen h-screen";

  const isLoggedIn = true; // Replace with your actual auth logic

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
