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

// import { useDispatch } from "react-redux";
// import { decrement, increment } from "./components/CounterSlice";

function App() {
  // const dispatch = useDispatch();
  const location=useLocation();
  const showBG=location.pathname==='/login'|| location.pathname==='/register';
  const containerClass=showBG ? "w-screen h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_small.jpg')]":"w-screen h-screen"

  return (
    <div className={containerClass}>
      <div className="bg-black/70 overflow-hidden"> 
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/search" element={<MovieSearch/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
