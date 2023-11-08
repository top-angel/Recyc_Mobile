import { createSlice } from "@reduxjs/toolkit";
import { generateAggregationLinkAsCollector } from "./bountyClaimAsCollector.actions";
import { IBountyClaimAsCollector } from "./bountyClaimAsCollector.types";

const bountyClaimAsCollectorState: IBountyClaimAsCollector = {
  loading: false,
  success: false,
  error: undefined,
};

const bountyClaimAsCollectorSlice = createSlice({
  name: "bounties/claimAsCollector",
  initialState: bountyClaimAsCollectorState,
  reducers: {
    resetBountyClaimAsCollector: () => bountyClaimAsCollectorState,
  },
  extraReducers: (builder) => {
    builder.addCase(generateAggregationLinkAsCollector.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(
      generateAggregationLinkAsCollector.fulfilled,
      (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      },
    );
    builder.addCase(
      generateAggregationLinkAsCollector.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      },
    );
  },
});

export const { resetBountyClaimAsCollector } =
  bountyClaimAsCollectorSlice.actions;
export default bountyClaimAsCollectorSlice;
