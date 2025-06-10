import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyMoviesPost } from "../apis";

export const addToWatchHistory = createAsyncThunk(
  "watchHistory/add",
  async (movie_id) => {
    return await historyMoviesPost(movie_id);
  }
);

const historySlicePost = createSlice({
  name: "historyMoviesPost",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchHistory.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addToWatchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Movie added to watch history.";
      })
      .addCase(addToWatchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        console.error("Error adding to watch history:", action.error);
      });
  },
});

export default historySlicePost.reducer;