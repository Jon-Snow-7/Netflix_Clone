import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  watchlistMovies } from "../apis";


export const watchlistMovieData = createAsyncThunk("WatchlistData", async () => {
  return await watchlistMovies();
});

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    isLoading: false,
    data: [],  // Change from `null` to empty array for consistency
    isError: false,
  },
  reducers: {
    removeMovieLocally: (state, action) => {
      const movieIdToRemove = action.payload;
      state.data = state.data.filter(movie => movie.id !== movieIdToRemove);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(watchlistMovieData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(watchlistMovieData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(watchlistMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error);
      });
  },
});

export const { removeMovieLocally } = watchlistSlice.actions;
export default watchlistSlice.reducer;
