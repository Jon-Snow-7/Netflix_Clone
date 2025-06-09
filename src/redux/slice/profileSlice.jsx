import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfiles } from "../apis";

export const fetchProfiles = createAsyncThunk("profiles/fetch", async () => {
  return await getProfiles();
});

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Profile fetch error:", action.error);
      });
  },
});

export default profileSlice.reducer;
