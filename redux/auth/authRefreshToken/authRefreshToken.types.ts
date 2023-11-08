import { SerializedError } from "@reduxjs/toolkit";

export interface IAuthRefreshToken {
  loading: boolean;
  success: boolean;
  access_token?: string;
  refresh_token?: string;
  status?: string;
  message?: SerializedError | string;
}
