import { createSlice } from "@reduxjs/toolkit";

export const ImageStore = createSlice({
  name: "image",
  initialState: { isOpen: false, url: "" },
  reducers: {
    onOpen(state) {
      state.isOpen = true;
    },
    onClose(state) {
      state.isOpen = false;
    },
    onUrl(state, action) {
      state.url = action.payload;
    },
  },
});

export const { onOpen, onClose, onUrl } = ImageStore.actions;
