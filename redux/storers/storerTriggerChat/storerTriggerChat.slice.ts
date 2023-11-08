import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStorerTriggerChat {
  success: boolean;
}

interface ITriggerChat {
  success: boolean;
}

const storerTriggerChatState: IStorerTriggerChat = {
  success: false,
};

const storerTriggerChatSlice = createSlice({
  name: "storers/triggerChat",
  initialState: storerTriggerChatState,
  reducers: {
    triggerChat: (state, action: PayloadAction<ITriggerChat>) => {
      state.success = action.payload.success;
    },
    resetTriggerChat: () => storerTriggerChatState,
  },
});

export const { triggerChat, resetTriggerChat } = storerTriggerChatSlice.actions;

export default storerTriggerChatSlice;
