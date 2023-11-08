import { SerializedError } from "@reduxjs/toolkit";

export interface IMissionGetImage {
  loading: boolean;
  success: boolean;
  description?: string;
  entity_ids: string[];
  entity_list_type?: string;
  id?: string;
  image?: string;
  name?: string;
  message?: SerializedError | string;
}
