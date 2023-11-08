import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyVerifyItem } from "./bountyVerifyItem.types";

interface IVerifyBountyItem {
  serialNumber: string;
  bountyId: string;
  walletAddress: string;
  isStorer: boolean;
}

export const verifyBountyItem = createAsyncThunk<
  IBountyVerifyItem,
  IVerifyBountyItem
>(
  "bounty/verifyItem",
  async (
    { serialNumber, bountyId, walletAddress, isStorer },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.put("/v1/bounties/verify", {
        serialNumber,
        bountyId,
        walletAddress,
        isStorer,
      });

      Toast.show({
        type: "success",
        text1: "Successfully verified item!",
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
