import { SerializedError } from "@reduxjs/toolkit";

export interface ICreatorCreateMission {
  loading: boolean;
  success: boolean;
  id?: string;
  message?: SerializedError | string;
}
