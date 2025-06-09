import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { watchlistMoviesPost } from "../apis";

export const addToWatchlist = createAsyncThunk(
  "watchlist/add",
  async (movie_id) => {
    return await watchlistMoviesPost(movie_id);
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Movie added to watchlist!";
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        console.error("Error adding to watchlist:", action.error);
      });
  },
});

export default watchlistSlice.reducer;
