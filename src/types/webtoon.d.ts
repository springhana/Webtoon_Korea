export interface WebtoonType {
  totalWebtoonCount: number;
  naverWebtoonCount: number;
  naverWebtoonCount: number;
  kakaoPageWebtoonCount: number;
  lastUpdate: string;
  updatedWebtoonCount: number;
  createdWebtoonCount: number;
  webtoons: WebtoonTypes;
  length: number;
}

export interface WebtoonsTypes {
  id: string;
  title: string;
  provider: string;
  updateDays: [];
  url: string;
  thumbnail: string[];
  isEnd: boolean;
  isFree: boolean;
  isUpdated: boolean;
  ageGrade: number;
  freeWaitHour: number;
  authors: string[];
}

export interface AdditionalType {
  adult: boolean;
  isUpdated: boolean;
}

export interface WebtoonImageType {
  width: number;
  height: number;
  img: string;
  title: string;
  adult: string;
  additional: AdditionalType;
}

export interface LoadDayType {
  day: string;
  webtoon: string;
  perPage?: number;
  page?: number;
}
