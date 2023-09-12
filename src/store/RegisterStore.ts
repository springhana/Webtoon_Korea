import { createSlice } from "@reduxjs/toolkit";

export const RegisterStore = createSlice({
  name: "register",
  initialState: { isOpen: false },
  reducers: {
    onOpen(state) {
      state.isOpen = true;
    },
    onClose(state) {
      state.isOpen = false;
    },
  },
});
export const { onOpen, onClose } = RegisterStore.actions;
