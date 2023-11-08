import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { queryMissionForPublic } from "./missionQueryPublic.actions";
import { IMissionQueryPublic } from "./missionQueryPublic.types";

const missionQueryPublicState: IMissionQueryPublic = {
  loading: false,
  success: false,
  result: [],
  message: undefined,
};

interface IUpdateImage {
  imageBase64: string;
  imageName: string;
}

const missionQueryPublicSlice = createSlice({
  name: "missions/queryForPublic",
  initialState: missionQueryPublicState,
  reducers: {
    updatePublicMissionImage: (state, action: PayloadAction<IUpdateImage>) => {
      if (action.payload?.imageBase64 && action.payload?.imageName) {
        state.result[0].imageBase64 = action.payload.imageBase64;
        state.result[0].imageName = action.payload.imageName;
      } else {
        state.result[0].imageBase64 = null;
        state.result[0].imageName = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(queryMissionForPublic.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(queryMissionForPublic.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.result = action.payload.result;
    });
    builder.addCase(queryMissionForPublic.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { updatePublicMissionImage } = missionQueryPublicSlice.actions;
export default missionQueryPublicSlice;
