// src/redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allMoviesApi } from "../apis";

export const allMoviesSliceData = createAsyncThunk(
  "allMovies",
  async ({ page, size }) => {
    return await allMoviesApi(page, size);
  }
);

const allMoviesSlice = createSlice({
  name: "allMovies",
  initialState: {
    isLoading: false,
    movies: [],
    isError: false,
    page: 1,
    hasMore: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(allMoviesSliceData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(allMoviesSliceData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allMoviesSliceData.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        const newMovies = action.payload.content || [];
        state.hasMore = newMovies.length > 0;
        state.page = action.meta.arg.page;

        if (state.page === 0) {
          state.movies = newMovies;
        } else {
          state.movies.push(...newMovies);
        }
      });
  },
});

export default allMoviesSlice.reducer;
