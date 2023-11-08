import { createSlice } from "@reduxjs/toolkit";
import { refreshAccessToken } from "./authRefreshToken.actions";
import { IAuthRefreshToken } from "./authRefreshToken.types";

const authRefreshTokenState: IAuthRefreshToken = {
  loading: false,
  success: false,
  access_token: undefined,
  refresh_token: undefined,
  status: undefined,
  message: undefined,
};

const authRefreshTokenSlice = createSlice({
  name: "auth/refreshToken",
  initialState: authRefreshTokenState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(refreshAccessToken.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default authRefreshTokenSlice;
