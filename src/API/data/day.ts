function getDayOfWeek() {
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = new Date();
  const dayIndex = today.getDay(); // 0부터 일요일, 1부터 월요일, ...

  return daysOfWeek[dayIndex];
}

const today = getDayOfWeek();
export default today;
