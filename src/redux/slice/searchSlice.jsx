// src/redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMoviesApi } from "../apis";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ query, genre, ratingMin, ratingMax }) => {
    return await searchMoviesApi(query, genre, ratingMin, ratingMax);
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isLoading: false,
    movies: [],
    suggestions: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.movies || [];
        state.suggestions = action.payload.suggestions || [];
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default searchSlice.reducer;
