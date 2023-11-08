import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyGetAllByStorer } from "./bountyGetAllByStorer.types";

interface IGetAllStorerBountyItems {
  walletAddress: string;
  page: number;
  perPage: number;
  sort: string;
  order: string;
}

export const getAllStorerBountyItems = createAsyncThunk<
  IBountyGetAllByStorer,
  IGetAllStorerBountyItems
>(
  "bounties/getAllStorerBountyItems",
  async (
    { walletAddress, page, perPage, sort, order },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.post(
        "/v1/bounties/wallet/storer",
        {
          walletAddress,
          page,
          perPage,
          sort,
          order,
        },
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
