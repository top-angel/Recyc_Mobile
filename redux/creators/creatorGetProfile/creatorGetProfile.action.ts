import { createAsyncThunk } from "@reduxjs/toolkit";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { ICreatorGetProfile } from "./creatorGetProfile.types";

interface IGetCreatorProfile {
  accessToken: string;
}

export const getCreatorProfile = createAsyncThunk<
  ICreatorGetProfile,
  IGetCreatorProfile
>("creator/getProfile", async ({ accessToken }, { rejectWithValue }) => {
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
