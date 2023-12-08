import { createSlice } from "@reduxjs/toolkit";
import { createNewStorer } from "./storerCreateNew.action";
import { IStorerCreateNew } from "./storerCreateNew.types";

const storerCreateNewState: IStorerCreateNew = {
  loading: false,
  success: false,
  nonce: undefined,
  message: undefined,
  error: undefined,
};

const storerCreateNewSlice = createSlice({
  name: "storer/createNew",
  initialState: storerCreateNewState,
  reducers: {
    resetStorerCreate: () => storerCreateNewState,
  },
  extraReducers: (builder) => {
    builder.addCase(createNewStorer.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createNewStorer.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.nonce = action.payload.nonce;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(createNewStorer.rejected, (state, action) => {
      state.loading = false;
      state.success = undefined;
      state.error = action.payload as { message: string };
    });
  },
});

export const { resetStorerCreate } = storerCreateNewSlice.actions;
export default storerCreateNewSlice;
