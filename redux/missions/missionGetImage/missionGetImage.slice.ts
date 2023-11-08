import { createSlice } from "@reduxjs/toolkit";
import { getMissionImage } from "./missionGetImage.actions";
import { IMissionGetImage } from "./missionGetImage.types";

const missionGetImageState: IMissionGetImage = {
  loading: false,
  success: false,
  description: undefined,
  entity_ids: [],
  entity_list_type: undefined,
  id: undefined,
  image: undefined,
  name: undefined,
  message: undefined,
};

const missionGetImageSlice = createSlice({
  name: "missions/getImage",
  initialState: missionGetImageState,
  reducers: {
    resetGetImage: () => missionGetImageState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMissionImage.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getMissionImage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.description = action.payload.description;
      state.entity_ids = action.payload.entity_ids;
      state.entity_list_type = action.payload.entity_list_type;
      state.id = action.payload.id;
      state.image = action.payload.image;
      state.name = action.payload.name;
    });
    builder.addCase(getMissionImage.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { resetGetImage } = missionGetImageSlice.actions;
export default missionGetImageSlice;
