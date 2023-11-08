import { createSlice } from "@reduxjs/toolkit";
import { createNewMission } from "./creatorCreateMission.actions";
import { ICreatorCreateMission } from "./creatorCreateMission.types";

const creatorMissionNewState: ICreatorCreateMission = {
  loading: false,
  success: false,
  id: undefined,
  message: undefined,
};

const creatorMissionNewSlice = createSlice({
  name: "creator/missionNew",
  initialState: creatorMissionNewState,
  reducers: {
    resetCreateMission: () => creatorMissionNewState,
  },
  extraReducers: (builder) => {
    builder.addCase(createNewMission.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createNewMission.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.id = action.payload.id;
    });
    builder.addCase(createNewMission.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { resetCreateMission } = creatorMissionNewSlice.actions;
export default creatorMissionNewSlice;
