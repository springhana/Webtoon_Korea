export interface WebtoonType {
  data: {
    totalWebtoonCount: number;
    naverWebtoonCount: number;
    naverWebtoonCount: number;
    kakaoPageWebtoonCount: number;
    lastUpdate: string;
    updatedWebtoonCount: number;
    createdWebtoonCount: number;
    webtoons: WebtoonTypes;
  };
}

export interface WebtoonsTypes {
  _id: string;
  title: string;
  author: string;
  url: string;
  img: string;
  service: string;
  updateDays: string[];
  fanCount: number;
  searchKeyword: string;
  additional: AdditionalType;
}

export interface AdditionalType {
  new: boolean;
  adult: boolean;
  rest: boolean;
  up: boolean;
  singularityList: string[];
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
