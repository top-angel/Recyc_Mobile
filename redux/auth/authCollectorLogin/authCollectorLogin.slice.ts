import { createSlice } from "@reduxjs/toolkit";
import { loginCollectorUser } from "./authCollectorLogin.actions";
import { IAuthLogin } from "./authCollectorLogin.types";

const authLoginState: IAuthLogin = {
  loading: false,
  success: false,
  access_token: undefined,
  refresh_token: undefined,
  status: undefined,
  message: undefined,
};

const authCollectorLoginSlice = createSlice({
  name: "authCollecor/login",
  initialState: authLoginState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginCollectorUser.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(loginCollectorUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(loginCollectorUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default authCollectorLoginSlice;
