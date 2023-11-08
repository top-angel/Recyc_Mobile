import { SerializedError } from "@reduxjs/toolkit";
import { StorerDoc } from "../storers.types";

export interface IStorerGetById {
  loading: boolean;
  success: boolean;
  storer?: StorerDoc;
  error?: SerializedError | string;
}
