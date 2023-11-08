import { SerializedError } from "@reduxjs/toolkit";
import { BountyAggregatedDoc } from "../bountyAggregated.types";

export interface IBountyGetBySerNumber {
  loading: boolean;
  success: boolean;
  bountyItem?: BountyAggregatedDoc;
  error?: SerializedError | string;
}
