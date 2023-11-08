import { createSlice } from "@reduxjs/toolkit";
import { getUserNonce } from "./authGetNonce.actions";
import { IAuthGetNonce } from "./authGetNonce.types";

const authGetNonceState: IAuthGetNonce = {
  loading: false,
  success: false,
  nonce: undefined,
  message: undefined,
};

const authGetNonceSlice = createSlice({
  name: "auth/getNonce",
  initialState: authGetNonceState,
  reducers: {
    resetGetNonce: () => authGetNonceState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserNonce.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getUserNonce.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.nonce = action.payload.nonce;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(getUserNonce.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { resetGetNonce } = authGetNonceSlice.actions;
export default authGetNonceSlice;
