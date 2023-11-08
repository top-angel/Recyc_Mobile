import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IMissionGetById } from "./missionGetById.types";

interface IGetMissionById {
  accessToken: string;
  id: string;
}

export const getMissionById = createAsyncThunk<
  IMissionGetById,
  IGetMissionById
>("missions/getById", async ({ accessToken, id }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axiosServer.get(`/api/v1/bounty/?id=${id}`, config);

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
