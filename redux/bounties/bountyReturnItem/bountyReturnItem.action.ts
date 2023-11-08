import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyReturnItem } from "./bountyReturnItem.types";

interface IReturnBountyItem {
  serialNumber: string;
  bountyId: string;
  walletAddress: string;
  isOwner: boolean;
}

export const returnBountyItem = createAsyncThunk<
  IBountyReturnItem,
  IReturnBountyItem
>(
  "bounty/returnItem",
  async (
    { serialNumber, bountyId, walletAddress, isOwner },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.put("/v1/bounties/return", {
        serialNumber,
        bountyId,
        walletAddress,
        isOwner,
      });

      Toast.show({
        type: "success",
        text1: "Successfully returned item!",
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
