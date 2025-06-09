// src/redux/slice/genreSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { genreMovies } from '../apis';

export const genreData = createAsyncThunk('genreData', async ({ genreId, page }) => {
  return await genreMovies(genreId, page);
});

const genreSlice = createSlice({
  name: 'genre',
  initialState: {
    isLoading: false,
    data: [],
    totalPages: 0,
    currentPage: 0,
    isError: false,
  },
  reducers: {
    resetGenreData: (state) => {
      state.data = [];
      state.currentPage = 0;
      state.totalPages = 0;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(genreData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(genreData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, ...action.payload.content];
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
      })
      .addCase(genreData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { resetGenreData } = genreSlice.actions;
export default genreSlice.reducer;
