import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "lib/generateMessageFromError";
import { axiosServer } from "services/axios";
import { IMissionClaimReward } from "./missionClaimReward.types";

interface IClaimMissionReward {
  accessToken: string;
  amount: number;
}

export const claimMissionReward = createAsyncThunk<
  IMissionClaimReward,
  IClaimMissionReward
>(
  "missions/claimReward",
  async ({ amount, accessToken }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axiosServer.post(
        "/api/v1/rewards/add-amount",
        { amount },
        config,
      );
      // const { data } = await axiosServer.post(
      //   "/api/v1/rewards/claim?source=recyclium",
      //   { entity_type: "image" },
      //   config,
      // );

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
