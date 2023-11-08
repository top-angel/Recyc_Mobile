import { SerializedError } from "@reduxjs/toolkit";

export interface IMissionGetBountyImages {
  loading: boolean;
  success: boolean;
  images: string[];
  message?: SerializedError | string;
}
