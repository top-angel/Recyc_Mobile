import { SerializedError } from "@reduxjs/toolkit";

export interface IBountyVerifyItem {
  loading: boolean;
  success: boolean;
  error?: SerializedError | string;
}
