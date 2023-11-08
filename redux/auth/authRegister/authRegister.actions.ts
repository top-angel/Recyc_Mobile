import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IAuthRegister } from "./authRegister.types";

interface IRegisterUser {
  public_address: string;
}

export const registerUser = createAsyncThunk<IAuthRegister, IRegisterUser>(
  "auth/register",
  async ({ public_address }, { rejectWithValue }) => {
    try {
      const res = await axiosServer.post("/register", {
        public_address,
      });

      Toast.show({
        type: "success",
        text1: "You are registered!",
        text2: "Go back, and enter into screen again to log in!",
      });

      return res.data;
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
