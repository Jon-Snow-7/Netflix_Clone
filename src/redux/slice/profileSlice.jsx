import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfiles, createProfile } from "../apis";
import { updateProfile, deleteProfile } from "../apis";

export const fetchProfiles = createAsyncThunk("profiles/fetch", async () => {
  return await getProfiles();
});

export const createProfileThunk = createAsyncThunk(
  "profiles/create",
  async (profileData) => {
    return await createProfile(profileData);
  }
);


export const updateProfileThunk = createAsyncThunk(
  "profiles/update",
  async ({ profileId, profileData }) => {
    return await updateProfile(profileId, profileData);
  }
);

export const deleteProfileThunk = createAsyncThunk(
  "profiles/delete",
  async (profileId) => {
    await deleteProfile(profileId); // no need to return
    return profileId; // used to update Redux state
  }
);


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
      })
      .addCase(createProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload); // Append new profile to existing list
      })
      .addCase(createProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Create profile error:", action.error);
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
      const index = state.data.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      })
      .addCase(deleteProfileThunk.fulfilled, (state, action) => {
        state.data = state.data.filter(p => p.id !== action.payload);
      })
  },
});

export default profileSlice.reducer;
