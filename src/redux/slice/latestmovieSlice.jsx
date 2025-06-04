import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { latestMovies } from "../apis";
export const latestMovieData=createAsyncThunk('latestMovieData',async()=>{
    return await latestMovies();
})

const latestMovieSlice=createSlice({
    name:'latest',
    initialState:{
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(latestMovieData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(latestMovieData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(latestMovieData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.error('Error:', action.error);
        });
    }
})
export default latestMovieSlice.reducer;