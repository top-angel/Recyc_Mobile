import { SerializedError } from "@reduxjs/toolkit";
import { BountyAggregatedDoc } from "../bountyAggregated.types";

export interface IBountyClaimedByWallet {
  loading: boolean;
  success: boolean;
  total: number;
  bountyItems: BountyAggregatedDoc[];
  error?: SerializedError | string;
}
