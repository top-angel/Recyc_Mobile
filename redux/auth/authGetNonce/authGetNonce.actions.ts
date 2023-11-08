import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IAuthGetNonce } from "./authGetNonce.types";

interface IGetNonce {
  public_address: string;
}

export const getUserNonce = createAsyncThunk<IAuthGetNonce, IGetNonce>(
  "auth/getNonce",
  async ({ public_address }, { rejectWithValue }) => {
    try {
      const { data } = await axiosServer.get(
        `/get-nonce?public_address=${public_address}`,
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
