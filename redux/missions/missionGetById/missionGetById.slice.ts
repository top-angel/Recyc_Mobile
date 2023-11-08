import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMissionById } from "./missionGetById.actions";
import { IMissionGetById } from "./missionGetById.types";

const missionGetByIdState: IMissionGetById = {
  loading: false,
  success: false,
  result: [],
  message: undefined,
};

interface IUpdateImage {
  imageBase64: string;
  imageName: string;
}

const missionGetByIdSlice = createSlice({
  name: "missions/getById",
  initialState: missionGetByIdState,
  reducers: {
    updateMissionImage: (state, action: PayloadAction<IUpdateImage>) => {
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
    builder.addCase(getMissionById.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getMissionById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.result = action.payload.result;
    });
    builder.addCase(getMissionById.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { updateMissionImage } = missionGetByIdSlice.actions;
export default missionGetByIdSlice;
