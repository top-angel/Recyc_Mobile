import { SerializedError } from "@reduxjs/toolkit";
import { ILink } from "../links.types";

export interface ILinkGetAll {
  loading: boolean;
  success: boolean;
  images: ILink[];
  error?: SerializedError | string;
}
