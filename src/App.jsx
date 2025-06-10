// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Counter from "./components/Counter";
import { useLocation } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import Home from "./pages/Home";
import MySpace from "./pages/MySpace";
import SearchPage from "./pages/SearchPage";
import WatchHistory from "./pages/WatchHistory";
import MovieDetail from "./components/MovieDetail";
import GenrePage from "./pages/Genre";
import AddMovies from "./pages/AddMovies";
import ListMovies from "./components/ListMovies";
import Profiles from "./pages/Profiles";
import ManageProfiles from "./pages/ManageProfiles";
import { Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { decrement, increment } from "./components/CounterSlice";

function App() {
  // const dispatch = useDispatch();
  const location = useLocation();
  const showBG = location.pathname === "/" || location.pathname === "/register";
  const containerClass = showBG
    ? "w-screen h-screen bg-[url('../public/images/netflixbg.jpg')]"
    : "w-screen h-screen";

  const isLoggedIn = !!localStorage.getItem("token"); // converts to true/false

  const PrivateRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
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
      </div>
    </div>
  );
}

export default App;
