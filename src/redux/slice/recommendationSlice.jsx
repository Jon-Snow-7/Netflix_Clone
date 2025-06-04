import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { recommendationMovies } from "../apis";


export const recommendationMovieData = createAsyncThunk("popularData", async () => {
  return await recommendationMovies();
});

const recommendationMovieSlice = createSlice({
  name: 'recommend',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommendationMovieData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recommendationMovieData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(recommendationMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error);
      });
  },
});

export default recommendationMovieSlice.reducer;