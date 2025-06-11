import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { popularMovies } from "../apis";

export const popularData = createAsyncThunk("popularData", async ({ page, size }) => {
  return await popularMovies(page, size);
});

const popularSlice = createSlice({
  name: 'popular',
  initialState: {
    isLoading: false,
    data: [],
    page: 0,
    hasMore: true,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(popularData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(popularData.fulfilled, (state, action) => {
        state.isLoading = false;
        const newMovies = action.payload.content || [];
        state.hasMore = newMovies.length > 0;
        state.page += 1;
        state.data.push(...newMovies);
      })
      .addCase(popularData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});


export default popularSlice.reducer;