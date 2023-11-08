import { createSlice } from "@reduxjs/toolkit";
import { searchStorersByGeolocation } from "./storerSearchGeolocation.action";
import { IStorerSearchGeolocation } from "./storerSearchGeolocation.types";

const storerSearchGeolocationState: IStorerSearchGeolocation = {
  loading: false,
  success: false,
  storers: [],
  error: undefined,
};

const storerSearchGeolocationSlice = createSlice({
  name: "storer/searchGeolocation",
  initialState: storerSearchGeolocationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchStorersByGeolocation.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(searchStorersByGeolocation.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.storers = action.payload.storers;
    });
    builder.addCase(searchStorersByGeolocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default storerSearchGeolocationSlice;
