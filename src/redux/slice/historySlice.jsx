import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { historyMovies } from "../apis";

export const historyData=createAsyncThunk('historyData',async()=>{
  return await historyMovies();
})

const historySlice = createSlice({
  name:'history',
  initialState: {
      isLoading: false,
      data: [],
      isError: false,
    },
    reducers: {
      removeMovieLocally: (state, action) => {
        const movieIdToRemove = action.payload;
        state.data = state.data.filter(movie => movie.id !== movieIdToRemove);
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(historyData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(historyData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(historyData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          console.error('Error:', action.error);
        });
    },
})

export const { removeMovieLocally } = historySlice.actions;
export default historySlice.reducer;