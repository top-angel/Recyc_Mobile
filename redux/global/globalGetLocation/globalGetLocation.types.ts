import { SerializedError } from "@reduxjs/toolkit";

export interface IGlobalGetLocation {
  loading: boolean;
  success: boolean;
  geolocation?: Geocode;
  message?: SerializedError | string;
}
