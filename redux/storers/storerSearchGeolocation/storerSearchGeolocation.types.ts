import { SerializedError } from "@reduxjs/toolkit";
import { StorerDoc } from "../storers.types";

export interface IStorerSearchGeolocation {
  loading: boolean;
  success: boolean;
  storers: StorerDoc[];
  error?: SerializedError | string;
}
