import { createSlice } from "@reduxjs/toolkit";
import { loginStorerUser } from "./authStorerLogin.actions";
import { IAuthLogin } from "./authStorerLogin.types";

const authLoginState: IAuthLogin = {
  loading: false,
  success: false,
  access_token: undefined,
  refresh_token: undefined,
  status: undefined,
  message: undefined,
};

const authStorerLoginSlice = createSlice({
  name: "authStorer/login",
  initialState: authLoginState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginStorerUser.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(loginStorerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(loginStorerUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default authStorerLoginSlice;
