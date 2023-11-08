import { SerializedError } from "@reduxjs/toolkit";

export interface IStorerCreateNew {
  loading: boolean;
  success: boolean;
  error?: SerializedError | string;
}
