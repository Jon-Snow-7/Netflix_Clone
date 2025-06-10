import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trendingMovies } from "../apis";


export const trendingData = createAsyncThunk("trendingData", async () => {
  return await trendingMovies();
});

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(trendingData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trendingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(trendingData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error);
      });
  },
});

export default trendingSlice.reducer;