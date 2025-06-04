import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  watchlistMovies } from "../apis";


export const watchlistMovieData = createAsyncThunk("popularData", async () => {
  return await watchlistMovies();
});

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
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

export default watchlistSlice.reducer;