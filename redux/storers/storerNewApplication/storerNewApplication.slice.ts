import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorersDoc } from "../storers.types";

interface IStorerNewApplication {
  success: boolean;
  application?: StorersDoc;
}

interface INewStorerApplication {
  application: StorersDoc;
}

const storerNewApplicationState: IStorerNewApplication = {
  success: false,
  application: undefined,
};

const storerNewApplicationSlice = createSlice({
  name: "storers/newApplication",
  initialState: storerNewApplicationState,
  reducers: {
    createStorerApplication: (
      state,
      action: PayloadAction<INewStorerApplication>,
    ) => {
      state.success = true;
      state.application = action.payload.application;
    },
    resetCreateStorerApplication: () => storerNewApplicationState,
  },
});

export const { createStorerApplication, resetCreateStorerApplication } =
  storerNewApplicationSlice.actions;

export default storerNewApplicationSlice;
