const services: string[] = ["naver", "kakao", "kakao_Page"];
let number: number = Math.floor(Math.random() * 3);
export const DefaultService: string = services[number];
export default services;
