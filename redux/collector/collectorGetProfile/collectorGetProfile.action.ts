import { createAsyncThunk } from "@reduxjs/toolkit";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { ICollectorGetProfile } from "./collectorGetProfile.types";

interface IGetCollectorProfile {
  accessToken: string;
}

export const getCollectorProfile = createAsyncThunk<
  ICollectorGetProfile,
  IGetCollectorProfile
>("collector/getProfile", async ({ accessToken }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axiosServer.get("/api/v1/profile", config);

    return data;
  } catch (error) {
    const message = generateMessageFromError(error);
    // Toast.show({
    //   type: "error",
    //   text1: message,
    // });
    return rejectWithValue({ message });
  }
});
