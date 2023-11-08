import { createSlice } from "@reduxjs/toolkit";
import { handshakeAsStorer } from "./bountyHandshakeAsStorer.action";
import { IBountyHandshakeAsStorer } from "./bountyHandshakeAsStorer.types";

const bountyHandshakeAsStorerState: IBountyHandshakeAsStorer = {
  loading: false,
  success: false,
  error: undefined,
};

const bountyHandshakeAsStorerSlice = createSlice({
  name: "bounties/handshakeAsStorer",
  initialState: bountyHandshakeAsStorerState,
  reducers: {
    resetHandshake: () => bountyHandshakeAsStorerState,
  },
  extraReducers: (builder) => {
    builder.addCase(handshakeAsStorer.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(handshakeAsStorer.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(handshakeAsStorer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string };
    });
  },
});

export const { resetHandshake } = bountyHandshakeAsStorerSlice.actions;
export default bountyHandshakeAsStorerSlice;
