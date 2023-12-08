import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { ISetIncident } from "./setIncident.types";

interface ISetNewIncident {
  user_id: string;
  description: string;
  accessToken: string;
}

export const setIncident = createAsyncThunk<ISetIncident, ISetNewIncident>(
  "set/incident",
  async ({ user_id, description, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "text/plain",
      },
    };
    try {
      const { data } = await axiosServer.post(
        "/api/v1/user/incidents",
        {
          user_id,
          description,
        },
        config,
      );
      Toast.show({
        type: "success",
        text1: "Successfully report incident",
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
