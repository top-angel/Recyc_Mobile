import { createSlice } from "@reduxjs/toolkit";
import { checkIfStorerExist } from "./storerCheck.action";
import { IStorerCheck } from "./storerCheck.types";

const storerCheckState: IStorerCheck = {
  loading: false,
  success: false,
  exists: false,
  error: undefined,
};

const storerCheckSlice = createSlice({
  name: "storer/checkIfExists",
  initialState: storerCheckState,
  reducers: {
    resetStorerCheck: () => storerCheckState,
  },
  extraReducers: (builder) => {
    builder.addCase(checkIfStorerExist.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(checkIfStorerExist.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.exists = action.payload.exists;
    });
    builder.addCase(checkIfStorerExist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export const { resetStorerCheck } = storerCheckSlice.actions;
export default storerCheckSlice;
