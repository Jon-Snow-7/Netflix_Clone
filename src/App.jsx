import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useLocation } from "react-router-dom";
import Home from './pages/Home'
import MySpace from './pages/MySpace'
import SearchPage from "./pages/SearchPage";
import WatchHistory from "./pages/WatchHistory";
import MovieDetail from "./components/MovieDetail";
import GenrePage from "./pages/Genre";
import AddMovies from "./pages/AddMovies";
import ListMovies from "./components/Moviescom/ListMovies";
import Profiles from "./pages/Profiles";
import ManageProfiles from "./pages/ManageProfiles";

function App() {
  const location=useLocation();
  const showBG=location.pathname==='/login'|| location.pathname==='/register';
  const containerClass=showBG ? "w-screen h-screen bg-[url('../public/images/netflixbg.jpg')]":"w-screen h-screen"
  return (
    <div className={containerClass}>
      <div className=" overflow-hidden"> 
        <Routes>
          <Route path="/profiles" element={<Profiles/>}></Route>
          <Route path="/manage_profiles" element={<ManageProfiles/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/myspace" element={<MySpace />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/history" element={<WatchHistory />}></Route>
          <Route path="/add" element={<AddMovies />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
          <Route path="/allmovies" element={<ListMovies />}></Route>
          <Route path="/genre/:id" element={<GenrePage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
