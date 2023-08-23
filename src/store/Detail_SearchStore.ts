import { configureStore, createSlice } from "@reduxjs/toolkit";

export const Detail_Search = createSlice({
  name: "detail_Search",
  initialState: { data: null },
  reducers: {
    detail_Search(state, action) {
      state.data = action.payload;
    },
  },
});
export const { detail_Search } = Detail_Search.actions;

export default configureStore({
  reducer: {
    detail_search: Detail_Search.reducer,
  },
});
