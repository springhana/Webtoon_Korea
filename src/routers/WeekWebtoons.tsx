import Category from "../components/Category";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../style/WeekWebtoons.module.css";
import { daysOfWeek } from "../API/data/date";
import WeekWebtoon from "../components/WeekWebtoon";
import Loading from "../components/Loading/Loading";
function WeekWebtoons({
  load,
  img,
  Iwidth,
  Iheight,
  handleImageLoad,
  removeImageLoad,
  isImageLoaded,
}: {
  load: (day: string, webtoon: string, perPage: number, page: number) => void;
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
    <div>
      <Category />
      <div className={styles.WeekWebtoon}>
        <WeekWebtoon
          day={day}
          webtoon={webtoon}
          Iwidth={Iwidth}
          Iheight={Iheight}
          handleImageLoad={handleImageLoad}
          load={load}
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
