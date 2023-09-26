import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Category from "../components/Webtoon/Category";
import WeekWebtoon from "../components/Webtoon/WeekWebtoon/WeekWebtoon";

import { daysOfWeek } from "../API/data/date";
import styles from "../style/Webtoon/WeekWebtoons.module.css";

function WeekWebtoons({
  img,
  Iwidth,
  Iheight,
}: {
  img: (webtoon: string, size: number) => void;
  Iwidth: number;
  Iheight: number;
}) {
  const { webtoon, day } = useParams() as { webtoon: string; day: string };
  const navigate = useNavigate();

  useEffect(() => {
    // day 파람이 요일이 아니면 404로
    if (
      day === daysOfWeek[0] ||
      day === daysOfWeek[1] ||
      day === daysOfWeek[2] ||
      day === daysOfWeek[3] ||
      day === daysOfWeek[4] ||
      day === daysOfWeek[5] ||
      day === daysOfWeek[6] ||
      day === "finished"
    ) {
      img(webtoon, day === "finished" ? 0.7 : 0.7);
    } else {
      navigate("/not-found");
    }
  }, [day, webtoon]);

  return (
    <div className={styles.weekWebtoon_outter}>
      <Category />
      <div className={styles.WeekWebtoon}>
        <WeekWebtoon
          day={day}
          webtoon={webtoon}
          Iwidth={Iwidth}
          Iheight={Iheight}
        />
      </div>

      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default WeekWebtoons;
