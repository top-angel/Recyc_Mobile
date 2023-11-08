import { SerializedError } from "@reduxjs/toolkit";
import { MissionDoc } from "../mission.types";

export interface IMissionsGetByUser {
  loading: boolean;
  success: boolean;
  missions: MissionDoc[];
  total: number;
  message?: SerializedError | string;
}
