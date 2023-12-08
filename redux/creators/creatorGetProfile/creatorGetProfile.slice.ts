import { createSlice } from "@reduxjs/toolkit";
import { getCreatorProfile } from "./creatorGetProfile.action";
import { ICreatorGetProfile } from "./creatorGetProfile.types";
import { CreatorDoc } from "../creators.types";

const creatorGetProfileState: ICreatorGetProfile = {
  loading: false,
  status: false,
  result: undefined,
  error: undefined,
};

const creatorGetProfileSlice = createSlice({
  name: "creator/getProfile",
  initialState: creatorGetProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCreatorProfile.pending, (state) => {
      state.loading = true;
      state.status = false;
    });
    builder.addCase(getCreatorProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.result = action.payload.result;
    });
    builder.addCase(getCreatorProfile.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default creatorGetProfileSlice;
