import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { ICreatorCreateMission } from "./creatorCreateMission.types";

interface ICreateNewMission {
  formData: FormData;
  accessToken: string;
}

export const createNewMission = createAsyncThunk<
  ICreatorCreateMission,
  ICreateNewMission
>(
  "creator/missionNew",
  async ({ formData, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axiosServer.post(
        "/register-creator",
        formData,
        config,
      );

      Toast.show({
        type: "success",
        text1: "Mission successfully created.",
      });

      return data;
    } catch (error) {
      const message = generateMessageFromError(error);
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
      return rejectWithValue({ message });
    }
  },
);
