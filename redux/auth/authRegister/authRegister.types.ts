import { SerializedError } from "@reduxjs/toolkit";

export interface IAuthRegister {
  loading: boolean;
  success: boolean;
  nonce?: string;
  status?: string;
  message?: SerializedError | string;
}
