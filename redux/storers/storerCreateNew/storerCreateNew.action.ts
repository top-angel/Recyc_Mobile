import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IGeocode } from "../storers.types";
import { IStorerCreateNew } from "./storerCreateNew.types";

interface ICreateNewStorer {
  walletAddress: string;
  name: string;
  address: string;
  geocode: IGeocode;
  postalCode: string;
  city: string;
  country: string;
  worktime: string;
  storageSpace: number;
}

export const createNewStorer = createAsyncThunk<
  IStorerCreateNew,
  ICreateNewStorer
>(
  "storer/createNew",
  async (
    {
      walletAddress,
      name,
      address,
      geocode,
      postalCode,
      city,
      country,
      worktime,
      storageSpace,
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await additionalServer.post("/v1/storers", {
        walletAddress,
        name,
        address,
        geocode,
        postalCode,
        city,
        country,
        worktime,
        storageSpace,
      });

      Toast.show({
        type: "success",
        text1: "Successfully created Storer Profile!",
      });

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
