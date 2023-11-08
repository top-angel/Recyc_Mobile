import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IStorerGetProfile } from "./storerGetProfile.types";

interface IGetStorerProfile {
  walletAddress: string;
}

export const getStorerProfile = createAsyncThunk<
  IStorerGetProfile,
  IGetStorerProfile
>("storer/getProfile", async ({ walletAddress }, { rejectWithValue }) => {
  try {
    const { data } = await additionalServer.post("/v1/storers/profile", {
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
