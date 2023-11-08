import { createSlice } from "@reduxjs/toolkit";
import { getBountyItemBySerNumber } from "./bountyGetBySerNumber.action";
import { IBountyGetBySerNumber } from "./bountyGetBySerNumber.types";

const bountyGetBySerNumberState: IBountyGetBySerNumber = {
  loading: false,
  success: false,
  bountyItem: undefined,
  error: undefined,
};

const bountyGetBySerNumberSlice = createSlice({
  name: "bounty/getBySerNumber",
  initialState: bountyGetBySerNumberState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBountyItemBySerNumber.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getBountyItemBySerNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.bountyItem = action.payload.bountyItem;
    });
    builder.addCase(getBountyItemBySerNumber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default bountyGetBySerNumberSlice;
