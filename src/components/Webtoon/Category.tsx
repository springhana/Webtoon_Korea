import { Link, useLocation, useParams } from "react-router-dom";

import { days, daysOfWeek } from "../../API/data/date";
import styles from "../../style/Webtoon/Category.module.css";

function Category() {
  const location = useLocation();
  const { webtoon, day } = useParams();

  function CheckDay(url: string) {
    switch (url) {
      case location.pathname:
        return "2px solid orange";
      default:
        return "none";
    }
  }

  return (
    <div className={styles.Category}>
      <ul>
        <li
          style={
            location.pathname === `/webtoon/${webtoon}`
              ? { borderBottom: "2px solid orange" }
              : { border: "none" }
          }
        >
          <Link to={`/webtoon/${webtoon}`}>요일전체</Link>
        </li>
        {days.map((days, index) => (
          <li
            key={index}
            style={
              location.pathname === `/webtoon/week/${webtoon}/${day}`
                ? {
                    borderBottom: CheckDay(
                      `/webtoon/week/${webtoon}/${daysOfWeek[index]}`
                    ),
                  }
                : { borderBottom: "none" }
            }
          >
            <Link to={`/webtoon/week/${webtoon}/${daysOfWeek[index]}`}>
              {days}
            </Link>
          </li>
        ))}
        <li
          style={
            location.pathname === `/webtoon/week/${webtoon}/finished`
              ? { borderBottom: "2px solid orange" }
              : { border: "none" }
          }
        >
          <Link to={`/webtoon/week/${webtoon}/finished`}>완결</Link>
        </li>
      </ul>
    </div>
  );
}

export default Category;
