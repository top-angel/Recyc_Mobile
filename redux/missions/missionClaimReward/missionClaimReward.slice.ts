import { createSlice } from "@reduxjs/toolkit";
import { claimMissionReward } from "./missionClaimReward.actions";
import { IMissionClaimReward } from "./missionClaimReward.types";

const missionsClaimRewardState: IMissionClaimReward = {
  loading: false,
  success: false,
  message: undefined,
};

const missionsClaimRewardSlice = createSlice({
  name: "missions/claimReward",
  initialState: missionsClaimRewardState,
  reducers: {
    resetClaimMission: () => missionsClaimRewardState,
  },
  extraReducers: (builder) => {
    builder.addCase(claimMissionReward.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(claimMissionReward.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(claimMissionReward.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { resetClaimMission } = missionsClaimRewardSlice.actions;
export default missionsClaimRewardSlice;
