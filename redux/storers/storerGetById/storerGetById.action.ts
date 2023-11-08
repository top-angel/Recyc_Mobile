import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IStorerGetById } from "./storerGetById.types";

interface IGetStorerById {
  id: string;
}

export const getStorerById = createAsyncThunk<IStorerGetById, IGetStorerById>(
  "storer/getById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await additionalServer.get(`/v1/storers/${id}`);

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
