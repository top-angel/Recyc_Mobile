import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColorSchema } from "../../../enums/colorSchema";

interface IGlobalScreenColor {
  backgroundColor: string;
}

interface ISetScreenColor {
  backgroundColor: string;
}

const globalScreenColorState: IGlobalScreenColor = {
  backgroundColor: ColorSchema.CREATOR_COLOR,
};

const globalScreenColorSlice = createSlice({
  name: "global/screenColor",
  initialState: globalScreenColorState,
  reducers: {
    setScreenBackground: (state, action: PayloadAction<ISetScreenColor>) => {
      state.backgroundColor = action.payload.backgroundColor;
    },
    resetScreenColor: () => globalScreenColorState,
  },
});

export const { setScreenBackground, resetScreenColor } =
  globalScreenColorSlice.actions;

export default globalScreenColorSlice;
