import { SerializedError } from "@reduxjs/toolkit";

export interface ICreatorUploadImage {
  loading: boolean;
  success: boolean;
  id?: string;
  message?: SerializedError | string;
}
