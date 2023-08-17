class Size {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

const naver = new Size(230, 292);
const kakao = new Size(230, 193);
const kakaoPage = new Size(230, 460);

export const imgSize: { width: number; height: number }[] = [
  naver,
  kakao,
  kakaoPage,
];
