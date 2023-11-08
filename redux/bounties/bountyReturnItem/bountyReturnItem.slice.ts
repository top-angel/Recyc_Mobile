import { createSlice } from "@reduxjs/toolkit";
import { returnBountyItem } from "./bountyReturnItem.action";
import { IBountyReturnItem } from "./bountyReturnItem.types";

const bountyReturnItemState: IBountyReturnItem = {
  loading: false,
  success: false,
  error: undefined,
};

const bountyReturnItemSlice = createSlice({
  name: "bounty/returnItem",
  initialState: bountyReturnItemState,
  reducers: {
    resetReturnBountyItem: () => bountyReturnItemState,
  },
  extraReducers: (builder) => {
    builder.addCase(returnBountyItem.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(returnBountyItem.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(returnBountyItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export const { resetReturnBountyItem } = bountyReturnItemSlice.actions;
export default bountyReturnItemSlice;
