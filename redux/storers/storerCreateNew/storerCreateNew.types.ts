import { SerializedError } from "@reduxjs/toolkit";

export interface IStorerCreateNew {
  loading: boolean;
  success: boolean;
  message: string;
  nonce?: string | number;
  status?: string;
  error?: SerializedError | string;
}
