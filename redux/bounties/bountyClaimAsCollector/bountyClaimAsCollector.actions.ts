import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyClaimAsCollector } from "./bountyClaimAsCollector.types";

interface IGenerateAggregationLinkAsCollector {
  walletAddress: string;
  items: string[];
  missionId: string;
}

export const generateAggregationLinkAsCollector = createAsyncThunk<
  IBountyClaimAsCollector,
  IGenerateAggregationLinkAsCollector
>(
  "bounties/claimAsCollector",
  async ({ walletAddress, missionId, items }, { rejectWithValue }) => {
    try {
      const { data } = await additionalServer.post("/v1/aggregates/collector", {
        walletAddress,
        items,
        missionId,
      });

      Toast.show({
        type: "success",
        text1: "Successfully generated aggregated QR Code!",
      });

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
