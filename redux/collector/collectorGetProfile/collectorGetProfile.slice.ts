import { createSlice } from "@reduxjs/toolkit";
import { getCollectorProfile } from "./collectorGetProfile.action";
import { ICollectorGetProfile } from "./collectorGetProfile.types";
import { CollectorDoc } from "../collectors.types";

const collectorGetProfileState: ICollectorGetProfile = {
  loading: false,
  status: false,
  result: undefined,
  error: undefined,
};

const collectorGetProfileSlice = createSlice({
  name: "collector/getProfile",
  initialState: collectorGetProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollectorProfile.pending, (state) => {
      state.loading = true;
      state.status = false;
    });
    builder.addCase(getCollectorProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.result = action.payload.result;
    });
    builder.addCase(getCollectorProfile.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default collectorGetProfileSlice;
