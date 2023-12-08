import { SerializedError } from "@reduxjs/toolkit";
import { StorerDoc } from "../storers.types";

export interface IStorerGetProfile {
  loading: boolean;
  status: boolean;
  result?: StorerDoc;
  error?: SerializedError | string;
}
