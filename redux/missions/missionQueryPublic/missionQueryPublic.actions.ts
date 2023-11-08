import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { axiosServer } from "../../../services/axios";
import { IMissionQueryPublic } from "./missionQueryPublic.types";

interface IQueryMissionForPublic {
  accessToken: string;
  id: string;
}

export const queryMissionForPublic = createAsyncThunk<
  IMissionQueryPublic,
  IQueryMissionForPublic
>(
  "missions/queryForPublic",
  async ({ accessToken, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axiosServer.get(
        `api/v1/bounty/query-view?design-doc=bounty-info&view=bounty-id&query-type=public_entity_id&type=bounty&doc_id=${id}`,
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
