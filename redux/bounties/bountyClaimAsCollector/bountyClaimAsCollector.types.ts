import { SerializedError } from "@reduxjs/toolkit";

export interface IBountyClaimAsCollector {
  loading: boolean;
  success: boolean;
  error?: SerializedError | string;
}
