import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { recentMovies } from "../apis";


export const recentMovieData = createAsyncThunk("popularData", async () => {
  return await recentMovies();
});

const recentlyMovieSlice = createSlice({
  name: 'recent',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(recentMovieData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recentMovieData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(recentMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error);
      });
  },
});

export default recentlyMovieSlice.reducer;