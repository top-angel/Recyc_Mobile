import { createSlice } from "@reduxjs/toolkit";
import { getStorerById } from "./storerGetById.action";
import { IStorerGetById } from "./storerGetById.types";

const storerGetByIdState: IStorerGetById = {
  loading: false,
  success: false,
  storer: undefined,
  error: undefined,
};

const storerGetByIdSlice = createSlice({
  name: "storer/getById",
  initialState: storerGetByIdState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStorerById.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getStorerById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.storer = action.payload.storer;
    });
    builder.addCase(getStorerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default storerGetByIdSlice;
