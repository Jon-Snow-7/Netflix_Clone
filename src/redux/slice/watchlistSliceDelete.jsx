import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { watchlistMoviesDelete } from "../apis";

export const removeFromWatchlist = createAsyncThunk(
  "watchlist/delete",
  async (movie_id) => {
    return await watchlistMoviesDelete(movie_id);
  }
);

const watchlistSliceDelete = createSlice({
  name: "watchlistDelete",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Movie removed from watchlist!";
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Movie removed from watchlist!";
      });
  },
});

export default watchlistSliceDelete.reducer;
