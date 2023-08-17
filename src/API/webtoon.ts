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
  // service: string = DefaultService
  service: string = DefaultService,
  perPage: number = 15,
  page: number = 0
) => {
  try {
    const response = await request(
      `https://korea-webtoon-api.herokuapp.com?updateDay=${day}&service=${service}&perPage=${perPage}&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetail_Search = async (title: string) => {
  try {
    const response = await request(
      `https://korea-webtoon-api.herokuapp.com/search?keyword=${title}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
