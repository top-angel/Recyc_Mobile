import { SerializedError } from "@reduxjs/toolkit";
import { CollectorDoc } from "../collectors.types";

export interface ICollectorGetProfile {
  loading: boolean;
  status: boolean;
  result?: CollectorDoc;
  error?: SerializedError | string;
}
