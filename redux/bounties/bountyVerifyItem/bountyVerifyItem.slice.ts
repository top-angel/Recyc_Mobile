import { createSlice } from "@reduxjs/toolkit";
import { verifyBountyItem } from "./bountyVerifyItem.action";
import { IBountyVerifyItem } from "./bountyVerifyItem.types";

const bountyVerifyItemState: IBountyVerifyItem = {
  loading: false,
  success: false,
  error: undefined,
};

const bountyVerifyItemSlice = createSlice({
  name: "bounty/verifyItem",
  initialState: bountyVerifyItemState,
  reducers: {
    resetVerifyBountyItem: () => bountyVerifyItemState,
  },
  extraReducers: (builder) => {
    builder.addCase(verifyBountyItem.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(verifyBountyItem.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(verifyBountyItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export const { resetVerifyBountyItem } = bountyVerifyItemSlice.actions;
export default bountyVerifyItemSlice;
