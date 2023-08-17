import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  MonWebtoon,
  TueWebtoon,
  WedWebtoon,
  ThuWebtoon,
  FriWebtoon,
  SatWebtoon,
  SunWebtoon,
} from "./webtoonDayStore";
import { Detail_Search } from "./Detail_SearchStore";

const naverWebtoon = createSlice({
  name: "naver",
  initialState: { data: null },
  reducers: {
    naver(state, action) {
      state.data = action.payload;
    },
  },
});

const kakaoWebtoon = createSlice({
  name: "kakao",
  initialState: { data: null },
  reducers: {
    kakao(state, action) {
      state.data = action.payload;
    },
  },
});

const kakaoPageWebtoon = createSlice({
  name: "kakaoPage",
  initialState: { data: null },
  reducers: {
    kakaoPage(state, action) {
      state.data = action.payload;
    },
  },
});

export const { naver } = naverWebtoon.actions;
export const { kakao } = kakaoWebtoon.actions;
export const { kakaoPage } = kakaoPageWebtoon.actions;

export default configureStore({
  reducer: {
    naver: naverWebtoon.reducer,
    kakao: kakaoWebtoon.reducer,
    kakaoPage: kakaoPageWebtoon.reducer,
    mon: MonWebtoon.reducer,
    tue: TueWebtoon.reducer,
    wed: WedWebtoon.reducer,
    thu: ThuWebtoon.reducer,
    fri: FriWebtoon.reducer,
    sat: SatWebtoon.reducer,
    sun: SunWebtoon.reducer,
    detail_search: Detail_Search.reducer,
  },
});
