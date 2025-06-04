import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { popularMovies } from "../apis";


export const popularData = createAsyncThunk("popularData", async () => {
  return await popularMovies();
});

const popularSlice = createSlice({
  name: 'popular',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(popularData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(popularData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(popularData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error);
      });
  },
});

export default popularSlice.reducer;