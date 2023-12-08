import { SerializedError } from "@reduxjs/toolkit";
import { CreatorDoc } from "../creators.types";

export interface ICreatorGetProfile {
  loading: boolean;
  status: boolean;
  result?: CreatorDoc;
  error?: SerializedError | string;
}
