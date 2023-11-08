import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";

interface IGetBountyImages {
  accessToken: string;
  bountyId: string;
}

export const getBountyImages = createAsyncThunk(
  "missions/getBountyImages",
  async ({ accessToken, bountyId }: IGetBountyImages, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axiosServer.get(
        `api/v1/bounty/images_ids?bounty_id=${bountyId}`,
        config,
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
