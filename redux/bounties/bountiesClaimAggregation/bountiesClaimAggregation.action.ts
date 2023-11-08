import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountiesClaimAggregation } from "./bountiesClaimAggregation.types";

interface IClaimAggregationItemsByCreator {
  hashedLink: string;
  bountyId: string;
  companyName: string;
  walletAddress: string;
  bountyName: string;
  isCreator: boolean;
}

export const claimAggregationItemsByCreator = createAsyncThunk<
  IBountiesClaimAggregation,
  IClaimAggregationItemsByCreator
>(
  "bounty/claimAggregatedItems",
  async (
    { hashedLink, bountyId, companyName, walletAddress, bountyName, isCreator },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.put("/v1/aggregates/claim", {
        hashedLink,
        bountyId,
        companyName,
        walletAddress,
        bountyName,
        isCreator,
      });

      Toast.show({
        type: "success",
        text1: "Successfully claimed aggregated bounty items.",
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
