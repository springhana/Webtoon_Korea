import { configureStore, createSlice } from "@reduxjs/toolkit";
import { LoginStore, LoginCheckStore } from "./LoginStore";
import { RegisterStore } from "./RegisterStore";
import { YesNoStore } from "./YesNo";
const Detail_Search = createSlice({
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
    login: LoginStore.reducer,
    register: RegisterStore.reducer,
    loginCheck: LoginCheckStore.reducer,
    yesNo: YesNoStore.reducer,
  },
});
