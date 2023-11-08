import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyClaimedByWallet } from "./bountyClaimedByWallet.types";

interface IGetAggregatedItemsByWallet {
  owner: string;
  bountyId: string;
  page: number;
  perPage: number;
  sort: string;
  order: string;
}

export const getAggregatedItemsByWallet = createAsyncThunk<
  IBountyClaimedByWallet,
  IGetAggregatedItemsByWallet
>(
  "bounties/getAggregatedItemsByWallet",
  async (
    { owner, bountyId, page, perPage, sort, order },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.post("/v1/bounties/wallet", {
        owner,
        bountyId,
        page,
        perPage,
        sort,
        order,
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
