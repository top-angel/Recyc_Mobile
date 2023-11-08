import { createSlice } from "@reduxjs/toolkit";
import { getAllMissions } from "./missionsGetAll.actions";
import { IMissionsGetAll } from "./missionsGetAll.types";

const missionsGetAllState: IMissionsGetAll = {
  loading: false,
  success: false,
  result: [],
  total: 0,
  message: undefined,
};

const missionsGetAllSlice = createSlice({
  name: "missions/getAll",
  initialState: missionsGetAllState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMissions.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getAllMissions.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.result = action.payload.result;
      state.total = action.payload.result.length;
    });
    builder.addCase(getAllMissions.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as { message: string };
    });
  },
});

export default missionsGetAllSlice;
