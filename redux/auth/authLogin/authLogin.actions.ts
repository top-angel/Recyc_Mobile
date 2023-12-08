import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IAuthLogin } from "./authLogin.types";

interface ILoginUser {
  public_address: string;
  signature: string;
}

export const loginUser = createAsyncThunk<IAuthLogin, ILoginUser>(
  "auth/login",
  async ({ public_address, signature }, { rejectWithValue }) => {
    try {
      const { data } = await axiosServer.post("/login", {
        public_address,
        signature,
      });
      Toast.show({
        type: "success",
        text1: "You are now logged in",
      });

      return data;
    } catch (error) {
      const message = generateMessageFromError(error);
      return rejectWithValue({ message });
    }
  },
);
