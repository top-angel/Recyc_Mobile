import { SerializedError } from "@reduxjs/toolkit";

export interface IBountiesClaimAggregation {
  loading: boolean;
  success: boolean;
  error?: SerializedError | string;
}
