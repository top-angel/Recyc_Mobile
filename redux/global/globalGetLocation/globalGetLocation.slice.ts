import { createSlice } from "@reduxjs/toolkit";
import { setGeoLocation } from "./globalGetLocation.actions";
import { IGlobalGetLocation } from "./globalGetLocation.types";

const globalSetGeolocationState: IGlobalGetLocation = {
  loading: false,
  success: false,
  geolocation: undefined,
  message: undefined,
};

const globalSetGeolocationSlice = createSlice({
  name: "global/setLocation",
  initialState: globalSetGeolocationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setGeoLocation.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(setGeoLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.geolocation = action.payload.geolocation;
    });
    builder.addCase(setGeoLocation.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default globalSetGeolocationSlice;
