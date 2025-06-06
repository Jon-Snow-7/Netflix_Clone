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
import Home from './pages/Home'
import MySpace from './pages/MySpace'
import SearchPage from "./pages/SearchPage";
import WatchHistory from "./pages/WatchHistory";
import MovieDetail from "./components/MovieDetail";
import GenrePage from "./pages/Genre";
import AddMovies from "./pages/AddMovies";

// import { useDispatch } from "react-redux";
// import { decrement, increment } from "./components/CounterSlice";

function App() {
  // const dispatch = useDispatch();
  const location=useLocation();
  const showBG=location.pathname==='/login'|| location.pathname==='/register';
  const containerClass=showBG ? "w-screen h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_small.jpg')]":"w-screen h-screen"

  return (
    <div className={containerClass}>
      <div className=" overflow-hidden"> 
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/myspace" element={<MySpace />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/history" element={<WatchHistory />}></Route>
          <Route path="/add" element={<AddMovies />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
          <Route path="/genre/:id" element={<GenrePage />}></Route>

        </Routes>
      </div>
      
    </div>
  );
}

export default App;
