import { useSelector } from "react-redux";
import WebtoonImage from "../components/WebtoonImage";
import { Link } from "react-router-dom";
import styles from "../style/WeekWebtoon.module.css";
import { WebtoonsTypes } from "../types/webtoon";

function WeekWebtoon({
  day,
  webtoon,
  Iwidth,
  Iheight,
  handleImageLoad,
}: {
  day: string;
  webtoon: string;
  Iwidth: number;
  Iheight: number;
  handleImageLoad: () => void;
}) {
  const webtoon_redux: any = useSelector((state: any) => {
    return state[day !== "finished" ? day : webtoon];
  });
  if (!webtoon_redux || !webtoon_redux.data) {
    return null; // 데이터가 없을 경우 렌더링하지 않음
  }
  console.log(webtoon_redux);
  return (
    <>
      {webtoon_redux.data.webtoons.map((data: WebtoonsTypes, index: number) => (
        <div
          key={data._id}
          className={styles.WeekWebtoon_Webtoon}
          style={{ width: `${Iwidth}px`, height: `${Iheight}px` }}
        >
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
                {data.title.length > 10
                  ? `${data.title.slice(0, 9)}...`
                  : data.title}
              </h3>
              <h4>
                {data.author.length > 12
                  ? `${data.author.slice(0, 12)}...`
                  : data.author}
              </h4>
            </Link>
          </>
        </div>
      ))}
    </>
  );
}
export default WeekWebtoon;
