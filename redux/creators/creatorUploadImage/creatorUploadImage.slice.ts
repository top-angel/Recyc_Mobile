import { createSlice } from "@reduxjs/toolkit";
import { uploadMisssionImage } from "./creatorUploadImage.actions";
import { ICreatorUploadImage } from "./creatorUploadImage.types";

const creatorUploadImageState: ICreatorUploadImage = {
  loading: false,
  success: false,
  id: undefined,
  message: undefined,
};

const creatorUploadImageSlice = createSlice({
  name: "creator/uploadImage",
  initialState: creatorUploadImageState,
  reducers: {
    resetCreatorUploadImage: () => creatorUploadImageState,
  },
  extraReducers: (builder) => {
    builder.addCase(uploadMisssionImage.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(uploadMisssionImage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.id = action.payload.id;
    });
    builder.addCase(uploadMisssionImage.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { resetCreatorUploadImage } = creatorUploadImageSlice.actions;
export default creatorUploadImageSlice;
