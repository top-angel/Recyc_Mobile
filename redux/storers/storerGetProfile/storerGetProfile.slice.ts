import { createSlice } from "@reduxjs/toolkit";
import { getStorerProfile } from "./storerGetProfile.action";
import { IStorerGetProfile } from "./storerGetProfile.types";
import { StorerDoc } from "../storers.types";

const storerGetProfileState: IStorerGetProfile = {
  loading: false,
  status: false,
  result: undefined,
  error: undefined,
};

const storerGetProfileSlice = createSlice({
  name: "storer/getProfile",
  initialState: storerGetProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStorerProfile.pending, (state) => {
      state.loading = true;
      state.status = false;
    });
    builder.addCase(getStorerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.result = action.payload.result;
    });
    builder.addCase(getStorerProfile.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default storerGetProfileSlice;
