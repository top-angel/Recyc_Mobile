import { SerializedError } from "@reduxjs/toolkit";
import { AggregatedItemDoc } from "../bountyAggregated.types";

export interface IBountiesGetAllAggregated {
  loading: boolean;
  success: boolean;
  total: number;
  aggregatedItems: AggregatedItemDoc[];
  error?: SerializedError | string;
}
