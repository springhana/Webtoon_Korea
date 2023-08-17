import { useEffect } from "react";
import { useSelector } from "react-redux";
import { days } from "../API/data/date";
import styles from "../style/DayWebtoon.module.css";
import { Link, useNavigate } from "react-router-dom";
import services from "../API/data/service";
import WebtoonImage from "./WebtoonImage";
import Loading from "./Loading/Loading";
import { WebtoonType, WebtoonsTypes } from "../types/webtoon";
function DayWebtoon({
  day,
  load,
  title,
  index,
  Iwidth,
  Iheight,
  perPage,
  size,
  handleImageLoad,
}: {
  day: string;
  load: (day: string, title: string, perPage: number, page: number) => void;
  title: string;
  index: number;
  Iwidth: number;
  Iheight: number;
  perPage: number;
  size: (size: WebtoonType) => void;
  handleImageLoad: () => void;
}) {
  const webtoon_redux: any = useSelector((state: any) => {
    return state[day];
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (
      title === services[0] ||
      title === services[1] ||
      title === services[2]
    ) {
      load(day, title, 300, 0);
      size(webtoon_redux);
    } else {
      navigate("/not-found");
    }
  }, [load, title, size, perPage]);
  if (!webtoon_redux.data || !webtoon_redux) {
    return null; // 데이터가 없을 경우 렌더링하지 않음
  }

  return (
    <div className={styles.dayWebtoon}>
      <h3>{days[index]}</h3>
      {webtoon_redux.data.webtoons.map((data: WebtoonsTypes, index: number) => (
        <div key={data._id} className={styles.dayWebtoon_Webtoon}>
          {index < perPage ? (
            <>
              <Link to={`/webtoon/detail/${data.title + data.author}`}>
                <WebtoonImage
                  width={Iwidth}
                  height={Iheight}
                  img={data.img}
                  title={data.title}
                  adult={data.additional.adult}
                  additional={data.additional}
                  handleImageLoad={handleImageLoad}
                />
                <h3>
                  {data.title.length > 8
                    ? `${data.title.slice(0, 8)}...`
                    : data.title}
                </h3>
              </Link>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default DayWebtoon;
