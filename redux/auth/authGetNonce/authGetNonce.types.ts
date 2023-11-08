import { SerializedError } from "@reduxjs/toolkit";

export interface IAuthGetNonce {
  loading: boolean;
  success: boolean;
  nonce?: string | number;
  status?: string;
  message?: SerializedError | string;
}
