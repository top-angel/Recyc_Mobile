import { createSlice } from "@reduxjs/toolkit";
import { getAllAggregatesByWallet } from "./bountiesGetAllAggregated.action";
import { IBountiesGetAllAggregated } from "./bountiesGetAllAggregated.types";

const bountiesGetAllAggregatesState: IBountiesGetAllAggregated = {
  loading: false,
  success: false,
  total: 0,
  aggregatedItems: [],
  error: undefined,
};

const bountiesGetAllAggregatesSlice = createSlice({
  name: "bounties/getAllAggregatesByWallet",
  initialState: bountiesGetAllAggregatesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAggregatesByWallet.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getAllAggregatesByWallet.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.total = action.payload.total;
      state.aggregatedItems = action.payload.aggregatedItems;
    });
    builder.addCase(getAllAggregatesByWallet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default bountiesGetAllAggregatesSlice;
