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
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axiosServer.post(
        "/api/v1/bounty/create",
        formData,
        config,
      );

      Toast.show({
        type: "success",
        text1: "Mission successfully created.",
      });

      return true;
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
