import { createSlice } from "@reduxjs/toolkit";

export const MonWebtoon = createSlice({
  name: "mon",
  initialState: { data: null },
  reducers: {
    monday(state, action) {
      state.data = action.payload;
    },
  },
});
export const TueWebtoon = createSlice({
  name: "tue",
  initialState: { data: null },
  reducers: {
    tuesday(state, action) {
      state.data = action.payload;
    },
  },
});
export const WedWebtoon = createSlice({
  name: "wed",
  initialState: { data: null },
  reducers: {
    wednesday(state, action) {
      state.data = action.payload;
    },
  },
});
export const ThuWebtoon = createSlice({
  name: "thu",
  initialState: { data: null },
  reducers: {
    thursday(state, action) {
      state.data = action.payload;
    },
  },
});
export const FriWebtoon = createSlice({
  name: "fri",
  initialState: { data: null },
  reducers: {
    friday(state, action) {
      state.data = action.payload;
    },
  },
});
export const SatWebtoon = createSlice({
  name: "sat",
  initialState: { data: null },
  reducers: {
    saturday(state, action) {
      state.data = action.payload;
    },
  },
});
export const SunWebtoon = createSlice({
  name: "sun",
  initialState: { data: null },
  reducers: {
    sunday(state, action) {
      state.data = action.payload;
    },
  },
});
export const { monday } = MonWebtoon.actions;
export const { tuesday } = TueWebtoon.actions;
export const { wednesday } = WedWebtoon.actions;
export const { thursday } = ThuWebtoon.actions;
export const { friday } = FriWebtoon.actions;
export const { saturday } = SatWebtoon.actions;
export const { sunday } = SunWebtoon.actions;
