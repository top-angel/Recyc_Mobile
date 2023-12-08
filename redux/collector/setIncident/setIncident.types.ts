import { SerializedError } from "@reduxjs/toolkit";

export interface ISetIncident {
  loading: boolean;
  status: boolean;
  message?: SerializedError | string;
}
