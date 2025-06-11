import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { latestMovies } from "../apis";

export const latestMovieData = createAsyncThunk(
  "latestMovieData",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      return await latestMovies(page, size);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const latestMovieSlice = createSlice({
  name: "latest",
  initialState: {
    data: {
      content: [],
      totalPages: 0,
      number: 0,
    },
    isLoading: false,
    isError: false,
    hasMore: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(latestMovieData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(latestMovieData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { content, totalPages, number } = action.payload;
        state.data.content = [...state.data.content, ...content];
        state.data.totalPages = totalPages;
        state.data.number = number;
        state.hasMore = number + 1 < totalPages;
      })
      .addCase(latestMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.payload);
      });
  },
});

export default latestMovieSlice.reducer;
