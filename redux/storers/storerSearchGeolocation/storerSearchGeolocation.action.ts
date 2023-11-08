import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IStorerSearchGeolocation } from "./storerSearchGeolocation.types";

interface ISearchStorersByGeolocation {
  geocode: Geocode;
  distance: number;
}

export const searchStorersByGeolocation = createAsyncThunk<
  IStorerSearchGeolocation,
  ISearchStorersByGeolocation
>(
  "storers/searchGeolocation",
  async ({ geocode, distance }, { rejectWithValue }) => {
    try {
      const { data } = await additionalServer.post(
        "/v1/storers/search/geolocation",
        {
          geocode,
          distance,
        },
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
  },
);
