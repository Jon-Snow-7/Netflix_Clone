import { configureStore } from "@reduxjs/toolkit";
//import continueReducer from './slice/continueSlice';
import historyReducer from './slice/historySlice';
import popularReducer from "./slice/popularSlice";
import allMoviesReducer from "./slice/allMoviesSlice"; 
import latestReducer from "./slice/latestmovieSlice";
import recentMovieReducer from "./slice/recentlyWatchSlice";
import watchlistReducer from "./slice/watchlistSlice";
import recommendReducer from "./slice/recommendationSlice";
import searchReducer from "../redux/slice/searchSlice";
import genreSlice from"../redux/slice/genreSlice"
import profileReducer from"../redux/slice/profileSlice"
import trendingReducer from "../redux/slice/trendingSlice"
import watchlistDeleteReducer from "../redux/slice/watchlistSliceDelete"
import watchlistPostReducer from "../redux/slice/watchlistSlicePost"
import historyPostReducer from "../redux/slice/historySlicePost"
import historyDeleteReducer from "../redux/slice/historySliceDelete"
import uiDataReducer from "./slice/uiConfigSlice";

export const store = configureStore({
  reducer: {
   // continue: continueReducer,
    history: historyReducer,
    historyMoviesDelete : historyDeleteReducer,
    historyMoviesPost : historyPostReducer,
    popular: popularReducer,
    latest: latestReducer,
    recent: recentMovieReducer,
    watchlist: watchlistReducer,
    recommend: recommendReducer,
    search: searchReducer, 
    genre: genreSlice,
    profile: profileReducer,
    trending: trendingReducer,
    watchlistDelete: watchlistDeleteReducer,  
    watchlistPost: watchlistPostReducer, 
    allMovies: allMoviesReducer,
    uiConfig: uiDataReducer
  },
});
