import { createSlice } from "@reduxjs/toolkit";
import { getAggregatedItemsByWallet } from "./bountyClaimedByWallet.actions";
import { IBountyClaimedByWallet } from "./bountyClaimedByWallet.types";

const bountyClaimedByWalletState: IBountyClaimedByWallet = {
  loading: false,
  success: false,
  total: 0,
  bountyItems: [],
  error: undefined,
};

const bountyClaimedByWalletSlice = createSlice({
  name: "bounties/getAggregatedItemsByWallet",
  initialState: bountyClaimedByWalletState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAggregatedItemsByWallet.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getAggregatedItemsByWallet.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.total = action.payload.total;
      state.bountyItems = action.payload.bountyItems;
    });
    builder.addCase(getAggregatedItemsByWallet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default bountyClaimedByWalletSlice;
