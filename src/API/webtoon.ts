import axios from "axios";
import { DefaultService } from "./data/service";
import today from "./data/day";
const request = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWebtoon = async (
  day: string = today,
  service: string = DefaultService,
  perPage: number = 30,
  page: number = 1
) => {
  try {
    const response = await request(
      `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?updateDay=${day.toUpperCase()}&provider=${service.toUpperCase()}&perPage=${perPage}&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetail_Search = async (title: string) => {
  try {
    console.log(title);

    const response = await request(
      `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?keyword=${title}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
