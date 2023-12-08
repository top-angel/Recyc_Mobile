import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IGeocode } from "../storers.types";
import { IStorerCreateNew } from "./storerCreateNew.types";

interface ICreateNewStorer {
  formData: FormData;
  accessToken: string;
}

export const createNewStorer = createAsyncThunk<
  IStorerCreateNew,
  ICreateNewStorer
>(
  "storer/createNew",
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
        "/register-storer",
        formData,
        config,
      );

      Toast.show({
        type: "success",
        text1: "Successfully created Storer Profile!",
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
