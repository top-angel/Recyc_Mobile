import { SerializedError } from "@reduxjs/toolkit";
import { StorerDoc } from "../storers.types";

export interface IStorerGetProfile {
  loading: boolean;
  success: boolean;
  storer?: StorerDoc;
  error?: SerializedError | string;
}
