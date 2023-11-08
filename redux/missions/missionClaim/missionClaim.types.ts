import { SerializedError } from "@reduxjs/toolkit";
import { MisssionClaimDoc } from "../mission.types";

export interface IMissionClaim {
  loading: boolean;
  success: boolean;
  missions: MisssionClaimDoc[];
  message?: SerializedError | string;
}
