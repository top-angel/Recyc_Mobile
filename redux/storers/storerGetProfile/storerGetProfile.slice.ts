import { createSlice } from "@reduxjs/toolkit";
import { getStorerProfile } from "./storerGetProfile.action";
import { IStorerGetProfile } from "./storerGetProfile.types";

const storerGetProfileState: IStorerGetProfile = {
  loading: false,
  success: false,
  storer: undefined,
  error: undefined,
};

const storerGetProfileSlice = createSlice({
  name: "storer/getProfile",
  initialState: storerGetProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStorerProfile.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getStorerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.storer = action.payload.storer;
    });
    builder.addCase(getStorerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default storerGetProfileSlice;
