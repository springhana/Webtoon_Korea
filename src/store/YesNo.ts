import { createSlice } from "@reduxjs/toolkit";

export const YesNoStore = createSlice({
  name: "YesNo",
  initialState: { open: false, yes: false },
  reducers: {
    onOpen(state) {
      state.open = true;
    },
    onClose(state) {
      state.open = false;
    },
    Yes(state) {
      state.yes = true;
    },
    No(state) {
      state.yes = false;
    },
  },
});
export const { onOpen, onClose, Yes, No } = YesNoStore.actions;
