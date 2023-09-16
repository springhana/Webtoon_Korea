import Category from "../components/Webtoon/Category";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../style/Webtoon/WeekWebtoons.module.css";
import { daysOfWeek } from "../API/data/date";
import WeekWebtoon from "../components/Webtoon/WeekWebtoon/WeekWebtoon";
import Loading from "../components/Loading";
function WeekWebtoons({
  img,
  Iwidth,
  Iheight,
  handleImageLoad,
  removeImageLoad,
  isImageLoaded,
}: {
  img: (webtoon: string, size: number) => void;
  Iwidth: number;
  Iheight: number;
  handleImageLoad: () => void;
  removeImageLoad: () => void;
  isImageLoaded: boolean;
}) {
  const { webtoon, day } = useParams() as { webtoon: string; day: string };

  const navigate = useNavigate();
  useEffect(() => {
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
      removeImageLoad();
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
          handleImageLoad={handleImageLoad}
        />
      </div>
      {isImageLoaded ? null : (
        <div className="Loading">
          <Loading />
        </div>
      )}
      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default WeekWebtoons;
