import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyMoviesDelete } from "../apis";

export const removeFromWatchHistory = createAsyncThunk(
  "watchHistory/delete",
  async (movie_id) => {
    return await historyMoviesDelete(movie_id);
  }
);

const historySliceDelete = createSlice({
  name: "historyMoviesDelete",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromWatchHistory.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(removeFromWatchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Movie added to watch history.";
      })
      .addCase(removeFromWatchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        console.error("Error adding to watch history:", action.error);
      });
  },
});

export default historySliceDelete.reducer;