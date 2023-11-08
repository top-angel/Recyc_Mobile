import { createSlice } from "@reduxjs/toolkit";
import { collectBountyItem } from "./bountyCollectItem.action";
import { IBountyCollectItem } from "./bountyCollectItem.types";

const bountyCollectItemState: IBountyCollectItem = {
  loading: false,
  success: false,
  error: undefined,
};

const bountyCollectItemSlice = createSlice({
  name: "bounty/collectItem",
  initialState: bountyCollectItemState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(collectBountyItem.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(collectBountyItem.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(collectBountyItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export default bountyCollectItemSlice;
