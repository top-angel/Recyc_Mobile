import { SerializedError } from "@reduxjs/toolkit";

export interface IMissionClaimReward {
  loading: boolean;
  success: boolean;
  message?: SerializedError | string;
}
