import { createSlice } from "@reduxjs/toolkit";
import { getAllStorerBountyItems } from "./bountyGetAllByStorer.action";
import { IBountyGetAllByStorer } from "./bountyGetAllByStorer.types";

const bountyGetStorerItemsState: IBountyGetAllByStorer = {
  loading: false,
  success: false,
  total: 0,
  bountyItems: [],
  error: undefined,
};

const bountyGetStorerItemsSlice = createSlice({
  name: "bounties/getAllStorerBountyItems",
  initialState: bountyGetStorerItemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStorerBountyItems.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getAllStorerBountyItems.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.total = action.payload.total;
      state.bountyItems = action.payload.bountyItems;
    });
    builder.addCase(getAllStorerBountyItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default bountyGetStorerItemsSlice;
