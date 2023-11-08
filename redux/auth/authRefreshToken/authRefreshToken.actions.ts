import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IAuthRefreshToken } from "./authRefreshToken.types";

interface IRefreshAccessToken {
  refresh_token: string;
}

export const refreshAccessToken = createAsyncThunk<
  IAuthRefreshToken,
  IRefreshAccessToken
>("auth/refreshToken", async ({ refresh_token }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    };

    const { data } = await axiosServer.post("/refresh", {}, config);

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
