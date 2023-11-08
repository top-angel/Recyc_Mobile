import { SerializedError } from "@reduxjs/toolkit";

export interface IBountyCountByWallet {
  loading: boolean;
  success: boolean;
  totalReturns: number;
  totalStored: number;
  error?: SerializedError | string;
}
