import { createSlice } from "@reduxjs/toolkit";
import { getMissionsByUser } from "./missionGetByUser.actions";
import { IMissionsGetByUser } from "./missionGetByUser.types";

const missionsGetByUserState: IMissionsGetByUser = {
  loading: false,
  success: false,
  missions: [],
  total: 0,
  message: undefined,
};

const missionsGetByUserSlice = createSlice({
  name: "missions/getByUser",
  initialState: missionsGetByUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMissionsByUser.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getMissionsByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.missions = action.payload;
      state.total = action.payload.length;
    });
    builder.addCase(getMissionsByUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default missionsGetByUserSlice;
