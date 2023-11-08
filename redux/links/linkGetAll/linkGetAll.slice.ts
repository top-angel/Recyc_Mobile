import { createSlice } from "@reduxjs/toolkit";
import { getAllLinks } from "./linkGetAll.actions";
import { ILinkGetAll } from "./linkGetAll.types";

const linkGetAllState: ILinkGetAll = {
  loading: false,
  success: false,
  images: [],
  error: undefined,
};

const linkGetAllSlice = createSlice({
  name: "links/getAll",
  initialState: linkGetAllState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLinks.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getAllLinks.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.images = action.payload.images;
    });
    builder.addCase(getAllLinks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default linkGetAllSlice;
