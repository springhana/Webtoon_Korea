const date = new Date();
export const days = ["일", "월", "화", "수", "목", "금", "토"];
export const Ktoday = days[date.getDay()];
export const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const KdaysOfWeek = daysOfWeek[date.getDay()];
