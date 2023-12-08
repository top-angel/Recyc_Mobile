import { SerializedError } from "@reduxjs/toolkit";

export interface IAuthLogin {
  loading: boolean;
  success: boolean;
  access_token?: string;
  refresh_token?: string;
  status?: string;
  message?: SerializedError | string;
}
