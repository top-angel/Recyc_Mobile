import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyCollectItem } from "./bountyCollectItem.types";

interface ICollectBountyItem {
  serialNumber: string;
  bountyId: string;
  walletAddress: string;
  isCollector: boolean;
}

export const collectBountyItem = createAsyncThunk<
  IBountyCollectItem,
  ICollectBountyItem
>(
  "bounty/collectItem",
  async (
    { serialNumber, bountyId, walletAddress, isCollector },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.put("/v1/bounties/collect", {
        serialNumber,
        bountyId,
        walletAddress,
        isCollector,
      });

      Toast.show({
        type: "success",
        text1: "Successfully collected item!",
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
