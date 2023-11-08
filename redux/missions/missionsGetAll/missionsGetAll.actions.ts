import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IMissionsGetAll } from "./missionsGetAll.types";

interface IGetAllMissions {
  accessToken: string;
}

export const getAllMissions = createAsyncThunk<
  IMissionsGetAll,
  IGetAllMissions
>("missions/getAll", async ({ accessToken }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axiosServer.get(
      "/api/v1/bounty/query-view?design-doc=bounty-info&view=all&query-type=all",
      config,
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
});
