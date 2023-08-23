import { Link } from "react-router-dom";
import styles from "../style/SearchWebtoon.module.css";
import WebtoonImage from "./WebtoonImage";
import { WebtoonsTypes } from "../types/webtoon";

function SearchWebtoon({
  data,
  width,
  height,
  TitleColor,
  handleImageLoad,
}: {
  data: WebtoonsTypes;
  width: (service: string) => string;
  height: (service: string) => string;
  TitleColor: (title: string) => string;
  handleImageLoad: () => void;
}) {
  return (
    <div className={styles.search}>
      <Link to={`/webtoon/detail/${data.title + data.author}`}>
        <div className={styles.search_cotainer}>
          <WebtoonImage
            width={parseInt(width(data.service))}
            height={parseInt(height(data.service))}
            img={data.img}
            title={data.title}
            adult={data.additional.adult}
            additional={data.additional}
            handleImageLoad={handleImageLoad}
          />
          <div className={styles.info}>
            <ul>
              <li className={styles.title}>{data.title}</li>
              <li className={styles.author}>{data.author}</li>
              <li
                className={styles.service}
                style={{ color: TitleColor(data.service) }}
              >
                {data.service}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SearchWebtoon;
