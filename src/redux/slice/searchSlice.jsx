  // src/redux/slices/searchSlice.js
  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import { searchMoviesApi } from "../apis";

  export const fetchSearchResults = createAsyncThunk(
    "search/fetchSearchResults",
    async ({ query, genre, ratingMin, ratingMax, page = 1 }) => {
      return await searchMoviesApi(query, genre, ratingMin, ratingMax, page);
    }
  );
  const searchSlice = createSlice({
    name: "search",
    initialState: {
      isLoading: false,
      movies: [],
      suggestions: [],
      isError: false,
      page: 1,
      hasMore: true,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSearchResults.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        }).addCase(fetchSearchResults.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
        }).addCase(fetchSearchResults.fulfilled, (state, action) => {
          state.isLoading = false;
          state.page = action.meta.arg.page;
          state.hasMore = action.payload.hasMore;

          if (state.page === 1) {
            state.movies = action.payload.movies || [];
            state.suggestions = action.payload.suggestions || [];
          } else {
            state.movies.push(...(action.payload.movies || []));
          }
        });
    },
  });

  export default searchSlice.reducer;
