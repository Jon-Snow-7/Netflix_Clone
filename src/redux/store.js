import { configureStore } from "@reduxjs/toolkit";
import continueReducer from './slice/continueSlice';
import historyReducer from './slice/historySlice';
import popularReducer from "./slice/popularSlice";
import latestReducer from "./slice/latestmovieSlice";
import recentMovieReducer from "./slice/recentlyWatchSlice";
import watchlistReducer from "./slice/watchlistSlice";
import recommendReducer from "./slice/recommendationSlice";
import searchReducer from "../redux/slice/searchSlice";
import genreSlice from"../redux/slice/genreSlice"
import profileReducer from"../redux/slice/profileSlice"

export const store = configureStore({
  reducer: {
    continue: continueReducer,
    history: historyReducer,
    popular: popularReducer,
    latest: latestReducer,
    recent: recentMovieReducer,
    watchlist: watchlistReducer,
    recommend: recommendReducer,
    search: searchReducer, 
    genre: genreSlice,
    profile: profileReducer
  },
});
