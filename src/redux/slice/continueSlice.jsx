// src/redux/slices/continueSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { continueMovies } from '../apis';

export const continueData = createAsyncThunk('continueData', async () => {
  return await continueMovies();
});

const continueSlice = createSlice({
  name: 'continue',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(continueData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(continueData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(continueData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error('Error:', action.error);
      });
  },
});

export default continueSlice.reducer;
