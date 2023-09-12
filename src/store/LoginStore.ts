import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginStore = createSlice({
  name: "login",
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

export const LoginCheckStore = createSlice({
  name: "loginCheck",
  initialState: { login: false, _id: "0" },
  reducers: {
    login(state) {
      state.login = true;
    },
    logout(state) {
      state.login = false;
    },
    addId(state, action) {
      state._id = action.payload;
    },
    removeId(state) {
      state._id = "0";
    },
  },
});

export const { onOpen, onClose } = LoginStore.actions;
export const { login, logout, addId, removeId } = LoginCheckStore.actions;
