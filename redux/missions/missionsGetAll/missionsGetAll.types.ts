import { SerializedError } from "@reduxjs/toolkit";
import { MissionDoc } from "../mission.types";

export interface IMissionsGetAll {
  loading: boolean;
  success: boolean;
  result: MissionDoc[];
  total: number;
  message?: SerializedError | string;
}
