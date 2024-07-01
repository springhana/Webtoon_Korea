import { Link } from "react-router-dom";

import WebtoonImage from "../WebtoonImage";

import { WebtoonsTypes } from "../../../types/webtoon";
import styles from "../../../style/Webtoon/SearchPage/SearchWebtoon.module.css";

function SearchWebtoon({
  data,
  width,
  height,
  TitleColor,
}: {
  data: WebtoonsTypes;
  width: (service: string) => string;
  height: (service: string) => string;
  TitleColor: (title: string) => string;
}) {
  return (
    <div className={styles.search}>
      <Link
        to={`/webtoon/detail/${data.title + data.authors[0]}/${data.provider}`}
      >
        <div className={styles.search_cotainer}>
          <WebtoonImage
            width={parseInt(width(data.provider))}
            height={parseInt(height(data.provider))}
            img={data.thumbnail[0]}
            title={data.title}
            adult={data.ageGrade}
            additional={{
              adult: data.ageGrade > 18,
              isUpdated: data.isUpdated,
            }}
          />
          <div className={styles.info}>
            <ul>
              <li className={styles.title}>{data.title}</li>
              {data.authors.map((i) => (
                <li className={styles.author}>{i}</li>
              ))}
              <li
                className={styles.service}
                style={{ color: TitleColor(data.provider) }}
              >
                {data.provider}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SearchWebtoon;
