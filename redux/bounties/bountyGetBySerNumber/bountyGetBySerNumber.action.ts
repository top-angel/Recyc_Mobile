import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import generateMessageFromError from "../../../lib/generateMessageFromError";
import { additionalServer } from "../../../services/axios";
import { IBountyGetBySerNumber } from "./bountyGetBySerNumber.types";

interface IGetBountyItemBySerNumber {
  serNumber: string;
}

export const getBountyItemBySerNumber = createAsyncThunk<
  IBountyGetBySerNumber,
  IGetBountyItemBySerNumber
>("bounty/getBySerNumber", async ({ serNumber }, { rejectWithValue }) => {
  try {
    const { data } = await additionalServer.post("/v1/bounties/sernumber", {
      serNumber,
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
});
