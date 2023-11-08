import { SerializedError } from "@reduxjs/toolkit";

export interface IStorerCheck {
  loading: boolean;
  success: boolean;
  exists: boolean;
  error?: SerializedError | string;
}
