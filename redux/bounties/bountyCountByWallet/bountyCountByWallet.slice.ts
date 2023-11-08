import { createSlice } from "@reduxjs/toolkit";
import { countBountyItemsByWallet } from "./bountyCountByWallet.action";
import { IBountyCountByWallet } from "./bountyCountByWallet.types";

const bountyCountByWalletState: IBountyCountByWallet = {
  loading: false,
  success: false,
  totalReturns: 0,
  totalStored: 0,
  error: undefined,
};

const bountyCountByWalletSlice = createSlice({
  name: "bounty/countByWallet",
  initialState: bountyCountByWalletState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(countBountyItemsByWallet.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(countBountyItemsByWallet.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.totalReturns = action.payload.totalReturns;
      state.totalStored = action.payload.totalStored;
    });
    builder.addCase(countBountyItemsByWallet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default bountyCountByWalletSlice;
