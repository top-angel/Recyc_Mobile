import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";

export const getAllLinks = createAsyncThunk(
  "links/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await additionalServer.get("/v1/links/all");

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
