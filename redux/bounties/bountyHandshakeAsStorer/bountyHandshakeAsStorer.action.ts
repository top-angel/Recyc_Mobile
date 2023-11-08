import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyHandshakeAsStorer } from "./bountyHandshakeAsStorer.types";

interface IHandshakeAsStorer {
  walletAddress: string;
  hashedLink: string;
  isStorer: boolean;
}

export const handshakeAsStorer = createAsyncThunk<
  IBountyHandshakeAsStorer,
  IHandshakeAsStorer
>(
  "bounties/handshakeAsStorer",
  async ({ hashedLink, walletAddress, isStorer }, { rejectWithValue }) => {
    try {
      const { data } = await additionalServer.put(
        "/v1/aggregates/claim/storer",
        {
          walletAddress,
          hashedLink,
          isStorer,
        },
      );

      Toast.show({
        type: "success",
        text1: "Handshake finished successfully!",
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
