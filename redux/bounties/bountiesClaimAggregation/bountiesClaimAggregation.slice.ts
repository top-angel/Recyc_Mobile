import { createSlice } from "@reduxjs/toolkit";
import { claimAggregationItemsByCreator } from "./bountiesClaimAggregation.action";
import { IBountiesClaimAggregation } from "./bountiesClaimAggregation.types";

const bountyClaimAggregationState: IBountiesClaimAggregation = {
  loading: false,
  success: false,
  error: undefined,
};

const bountyClaimAggregationSlice = createSlice({
  name: "claimAggregatedItems",
  initialState: bountyClaimAggregationState,
  reducers: {
    resetClaimAggregatedItems: () => bountyClaimAggregationState,
  },
  extraReducers: (builder) => {
    builder.addCase(claimAggregationItemsByCreator.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(claimAggregationItemsByCreator.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(
      claimAggregationItemsByCreator.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      },
    );
  },
});

export const { resetClaimAggregatedItems } =
  bountyClaimAggregationSlice.actions;
export default bountyClaimAggregationSlice;
