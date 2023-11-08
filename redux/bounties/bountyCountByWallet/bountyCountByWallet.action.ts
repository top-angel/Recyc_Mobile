import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyCountByWallet } from "./bountyCountByWallet.types";

interface ICountBountyItemsByWallet {
  walletAddress: string;
}

export const countBountyItemsByWallet = createAsyncThunk<
  IBountyCountByWallet,
  ICountBountyItemsByWallet
>("bounty/countByWallet", async ({ walletAddress }, { rejectWithValue }) => {
  try {
    const { data } = await additionalServer.post("/v1/bounties/wallet/count", {
      walletAddress,
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
});
