import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { IMissionClaim } from "./missionClaim.types";

const missionClaimState: IMissionClaim = {
  loading: false,
  success: false,
  missions: [],
  message: undefined,
};

interface IClaimMission {
  missionId: string;
  bountyId: string;
  bountyName: string;
  companyName: string;
  startDate: string;
  endDate: string;
}

const missionClaimSlice = createSlice({
  name: "missions/claim",
  initialState: missionClaimState,
  reducers: {
    claimMission: (state, action: PayloadAction<IClaimMission>) => {
      const checker = state.missions.some(
        (item) => item.missionId === action.payload.missionId,
      );
      if (!checker) {
        state.missions = [
          ...state.missions,
          {
            missionId: action.payload.missionId,
            bountyId: action.payload.bountyId,
            bountyName: action.payload.bountyName,
            companyName: action.payload.companyName,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
          },
        ];
      } else {
        Toast.show({
          type: "error",
          text1: "You already claimed this mission.",
        });
      }
    },
  },
});

export const { claimMission } = missionClaimSlice.actions;
export default missionClaimSlice;
