import { createSlice } from "@reduxjs/toolkit";
import { setIncident } from "./setIncident.action";
import { ISetIncident } from "./setIncident.types";

const registrationCollectorNewState: ISetIncident = {
  loading: false,
  status: false,
  message: undefined,
};

const setNewIncidentSlice = createSlice({
  name: "collector/incident",
  initialState: registrationCollectorNewState,
  reducers: {
    resetCreateMission: () => registrationCollectorNewState,
  },
  extraReducers: (builder) => {
    builder.addCase(setIncident.pending, (state) => {
      state.loading = true;
      state.status = false;
    });
    builder.addCase(setIncident.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    });
    builder.addCase(setIncident.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export const { resetCreateMission } = setNewIncidentSlice.actions;
export default setNewIncidentSlice;
