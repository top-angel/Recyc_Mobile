import { SerializedError } from "@reduxjs/toolkit";

export interface IBountyHandshakeAsStorer {
  loading: boolean;
  success: boolean;
  error?: SerializedError | string;
}
