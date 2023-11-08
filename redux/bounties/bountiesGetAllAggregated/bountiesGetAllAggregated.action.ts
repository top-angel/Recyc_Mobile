import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountiesGetAllAggregated } from "./bountiesGetAllAggregated.types";

interface IGetCollectorAggregates {
  walletAddress: string;
  page: number;
  perPage: number;
  sort: string;
  order: string;
}

export const getAllAggregatesByWallet = createAsyncThunk<
  IBountiesGetAllAggregated,
  IGetCollectorAggregates
>(
  "bounties/getAllAggregatesByWallet",
  async (
    { walletAddress, page, perPage, sort, order },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.post(
        "/v1/aggregates/wallet/all",
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
