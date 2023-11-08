import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { ICreatorUploadImage } from "./creatorUploadImage.types";

interface IUploadMisssionImage {
  baseImage: string;
  entityIds: string[];
  accessToken: string;
  name: string;
}

export const uploadMisssionImage = createAsyncThunk<
  ICreatorUploadImage,
  IUploadMisssionImage
>(
  "creator/uploadImage",
  async ({ baseImage, accessToken, entityIds, name }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axiosServer.post(
        "/api/v1/entity-lists/create",
        {
          entity_ids: entityIds,
          image: baseImage,
          entity_type: "image",
          visibility: "public",
          name,
        },
        config,
      );

      Toast.show({
        type: "success",
        text1: "You have been uploaded image.",
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
