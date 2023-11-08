import { SerializedError } from "@reduxjs/toolkit";

export interface IBountyReturnItem {
  loading: boolean;
  success: boolean;
  error?: SerializedError | string;
}
