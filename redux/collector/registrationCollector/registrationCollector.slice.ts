import { createSlice } from "@reduxjs/toolkit";
import { createNewCollector } from "./registrationCollector.action";
import { IRegistrationCollector } from "./registrationCollector.types";

const registrationCollectorNewState: IRegistrationCollector = {
  loading: false,
  success: false,
  nonce: undefined,
  message: undefined,
  error: undefined,
};

const createCollectorNewSlice = createSlice({
  name: "collect/createNew",
  initialState: registrationCollectorNewState,
  reducers: {
    resetCreateMission: () => registrationCollectorNewState,
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCollector.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createNewCollector.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.nonce = action.payload.nonce;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(createNewCollector.rejected, (state, action) => {
      state.loading = false;
      state.success = undefined;
      state.error = action.payload as { message: string };
    });
  },
});

export const { resetCreateMission } = createCollectorNewSlice.actions;
export default createCollectorNewSlice;
