import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { recommendationMovies } from "../apis";

export const recommendationMovieData = createAsyncThunk(
  "recommendationData",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      return await recommendationMovies(page, size);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const recommendationMovieSlice = createSlice({
  name: "recommend",
  initialState: {
    isLoading: false,
    isError: false,
    hasMore: true,
    data: {
      content: [],
      totalPages: 0,
      number: 0,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommendationMovieData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recommendationMovieData.fulfilled, (state, action) => {
        const { content, totalPages, number } = action.payload;
        state.isLoading = false;
        state.data.content = [...state.data.content, ...content];
        state.data.totalPages = totalPages;
        state.data.number = number;
        state.hasMore = number + 1 < totalPages;
      })
      .addCase(recommendationMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.payload);
      });
  },
});

export default recommendationMovieSlice.reducer;
