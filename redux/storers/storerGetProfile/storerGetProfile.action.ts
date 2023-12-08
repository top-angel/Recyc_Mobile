import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IStorerGetProfile } from "./storerGetProfile.types";

interface IGetStorerProfile {
  accessToken: string;
}

export const getStorerProfile = createAsyncThunk<
  IStorerGetProfile,
  IGetStorerProfile
>("storer/getProfile", async ({ accessToken }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axiosServer.get("/api/v1/profile", config);

    return data;
  } catch (error) {
    const message = generateMessageFromError(error);
    // Toast.show({
    //   type: "error",
    //   text1: message,
    // });
    return rejectWithValue({ message });
  }
});
