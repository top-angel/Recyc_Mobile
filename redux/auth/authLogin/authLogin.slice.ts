import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authLogin.actions";
import { IAuthLogin } from "./authLogin.types";

const authLoginState: IAuthLogin = {
  loading: false,
  success: false,
  access_token: undefined,
  refresh_token: undefined,
  status: undefined,
  message: undefined,
};

const authLoginSlice = createSlice({
  name: "auth/login",
  initialState: authLoginState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default authLoginSlice;
