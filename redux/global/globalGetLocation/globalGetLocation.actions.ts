import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { getGeolocation } from "../../../lib/getGeolocation";
import { IGlobalGetLocation } from "./globalGetLocation.types";

export const setGeoLocation = createAsyncThunk<IGlobalGetLocation>(
  "global/setLocation",
  async (_, { rejectWithValue }) => {
    try {
      const { geocode } = await getGeolocation();

      Toast.show({
        type: "success",
        text1: "Location set successfully",
      });

      return geocode;
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
