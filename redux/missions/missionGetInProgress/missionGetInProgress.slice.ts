import { createSlice } from "@reduxjs/toolkit";
import { getMissionInProgress } from "./missionGetInProgress.actions";
import { IMissionGetInProgress } from "./missionGetInProgress.types";

const missionsGetInProgressState: IMissionGetInProgress = {
  loading: false,
  success: false,
  missions: [],
  total_count: 0,
  message: undefined,
};

const missionsGetInProgressSlice = createSlice({
  name: "missions/getInProgress",
  initialState: missionsGetInProgressState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMissionInProgress.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getMissionInProgress.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.missions = action.payload.missions;
      state.total_count = action.payload.total_count;
    });
    builder.addCase(getMissionInProgress.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default missionsGetInProgressSlice;
