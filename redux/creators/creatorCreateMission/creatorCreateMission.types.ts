import { SerializedError } from "@reduxjs/toolkit";

export interface ICreatorCreateMission {
  loading: boolean;
  success: boolean;
  message: string;
  nonce?: string | number;
  status?: string;
  error?: SerializedError | string;
}
