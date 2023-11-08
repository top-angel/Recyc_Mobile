import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IStorerCheck } from "./storerCheck.types";

interface ICheckIfStorerExist {
  walletAddress: string;
}

export const checkIfStorerExist = createAsyncThunk<
  IStorerCheck,
  ICheckIfStorerExist
>("storer/checkIfExists", async ({ walletAddress }, { rejectWithValue }) => {
  try {
    const { data } = await additionalServer.post("/v1/storers/wallet", {
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
