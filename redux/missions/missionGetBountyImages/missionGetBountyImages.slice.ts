import { createSlice } from "@reduxjs/toolkit";
import { getBountyImages } from "./missionGetBountyImages.actions";
import { IMissionGetBountyImages } from "./missionGetBountyImages.types";

const missionGetBountyImagesState: IMissionGetBountyImages = {
  loading: false,
  success: false,
  images: [],
  message: undefined,
};

const missionGetBountyImagesSlice = createSlice({
  name: "missions/getBountyImages",
  initialState: missionGetBountyImagesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBountyImages.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getBountyImages.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.images = action.payload;
    });
    builder.addCase(getBountyImages.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default missionGetBountyImagesSlice;
