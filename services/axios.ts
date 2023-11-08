import axios from "axios";
import { PRODUCTION } from "lib/constants";

// const dataUnionUri = "https://crab.dev.dataunion.app";
const dataUnionUri = "https://crab.recyclium.dataunion.app";

export const additionalUri = PRODUCTION
  ? "https://oldbackend.recyclium.dataunion.app"
  : "http://192.168.0.24:5000";

export const axiosServer = axios.create({
  timeout: 10000,
  baseURL: `${dataUnionUri}`,
});

export const additionalServer = axios.create({
  baseURL: `${additionalUri}/api`,
});
