import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authRegister.actions";
import { IAuthRegister } from "./authRegister.types";

const authRegisterState: IAuthRegister = {
  loading: false,
  success: false,
  nonce: undefined,
  message: undefined,
};

const authRegisterSlice = createSlice({
  name: "auth/register",
  initialState: authRegisterState,
  reducers: {
    resetRegisterUser: () => authRegisterState,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.nonce = action.payload.nonce;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { resetRegisterUser } = authRegisterSlice.actions;
export default authRegisterSlice;
