import { SerializedError } from "@reduxjs/toolkit";
import { MissionDoc } from "../mission.types";

export interface IMissionGetById {
  loading: boolean;
  success: boolean;
  result: MissionDoc[];
  message?: SerializedError | string;
}
