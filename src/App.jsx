import React, { lazy, Suspense, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";

// Constants
const ADMIN_EMAIL = "admin@nobroker.in";

// Lazy load all components/pages
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

const HomeAdmin = lazy(() => import("./pages/HomeAdmin"));
const MySpaceAdmin = lazy(() => import("./pages/MySpaceAdmin"));
const SearchPageAdmin = lazy(() => import("./pages/SearchPageAdmin"));
const WatchHistoryAdmin = lazy(() => import("./pages/WatchHistoryAdmin"));
const GenrePageAdmin = lazy(() => import("./pages/GenreAdmin"));
const ListMoviesAdmin = lazy(() => import("./components/Moviescom/ListMoviesAdmin"));

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const showBG = location.pathname === "/" || location.pathname === "/register";
  const containerClass = showBG
    ? "w-screen h-screen bg-[url('../public/images/netflixbg.jpg')]"
    : "w-screen h-screen";

  const decodedEmail = useMemo(() => {
    try {
      if (!token) return null;
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload?.sub || null;
    } catch (e) {
      return null;
    }
  }, [token]);

  const isLoggedIn = !!token;
  const isAdmin = decodedEmail === ADMIN_EMAIL;

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  const AdminRoute = ({ children }) => {
    return isLoggedIn && isAdmin ? children : <Navigate to="/" replace />;
  };

  return (
    <div className={containerClass}>
      <div className=" overflow-hidden">
        <Routes>
          {/* Always accessible */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          

          {/* Protected Routes */}
                    <Route path="/profiles" element={<Profiles/>}></Route>
          <Route path="/manage_profiles" element={<ManageProfiles/>}></Route>
          <Route
            path="/movie/:id"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <MovieDetail />
              </PrivateRoute>
            }
          />

          {/* Admin vs Normal User Routing */}
          {isAdmin ? (
            <>
              <Route
                path="/home"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <HomeAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/myspace"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <MySpaceAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <SearchPageAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <WatchHistoryAdmin />
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
                path="/allmovies"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <ListMoviesAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/genre/:id"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <GenrePageAdmin />
                  </PrivateRoute>
                }
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;