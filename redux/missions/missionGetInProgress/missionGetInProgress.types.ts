import { SerializedError } from "@reduxjs/toolkit";
import { MissionPartialDoc } from "../mission.types";

export interface IMissionGetInProgress {
  loading: boolean;
  success: boolean;
  total_count: number;
  missions: MissionPartialDoc[];
  message?: SerializedError | string;
}
