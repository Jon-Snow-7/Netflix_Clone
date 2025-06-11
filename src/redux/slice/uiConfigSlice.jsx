import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uiConfigApi } from "../apis";


export const uiData = createAsyncThunk("uiData", async () => {
  return await uiConfigApi();
});

const uiConfigSlice = createSlice({
  name: 'ui-config',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uiData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(uiData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error);
      });
  },
});

export default uiConfigSlice.reducer;