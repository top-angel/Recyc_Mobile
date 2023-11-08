import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IMissionGetInProgress } from "./missionGetInProgress.types";

interface IGetMissionInProgress {
  accessToken: string;
  bountyId: string;
}

export const getMissionInProgress = createAsyncThunk<
  IMissionGetInProgress,
  IGetMissionInProgress
>(
  "missions/getInProgress",
  async ({ accessToken, bountyId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axiosServer.get(
        `api/v1/missions/info?type=upload&status=ready_to_start&page=1&sort_direction=desc&sort_by=created_at&bounty_id=${bountyId}`,
        config,
      );

      return data;
    } catch (error) {
      const message = generateMessageFromError(error);
      Toast.show({
        type: "error",
        text1: message,
      });
      return rejectWithValue({ message });
    }
  },
);
