import { SerializedError } from "@reduxjs/toolkit";

export interface IBountyCollectItem {
  loading: boolean;
  success: boolean;
  error?: SerializedError | string;
}
