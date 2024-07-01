import { Link } from "react-router-dom";

import WebtoonImage from "./WebtoonImage";

import { WebtoonsTypes } from "../../types/webtoon";
import styles from "../../style/Webtoon/WebtoonContainer.module.css";

export default function WebtoonContainer({
  data,
  Iwidth,
  Iheight,
  handleImageLoad,
  lastBookElementRef,
}: {
  Iwidth: number;
  Iheight: number;
  data: WebtoonsTypes;
  handleImageLoad?: () => void;
  lastBookElementRef?: any;
}) {
  return (
    <div
      key={data.id}
      className={styles.dayWebtoon_Webtoon}
      ref={lastBookElementRef}
    >
      <>
        <Link to={`/webtoon/detail/${data.title}/${data.provider}`}>
          <WebtoonImage
            width={Iwidth}
            height={Iheight}
            img={data.thumbnail[0]}
            title={data.title}
            adult={data.ageGrade}
            additional={{
              adult: data.ageGrade > 18,
              isUpdated: data.isUpdated,
            }}
            handleImageLoad={handleImageLoad}
          />
          <h3 className="authorsText">
            {data.title.length > 8
              ? `${data.title.slice(0, 8)}...`
              : data.title}
          </h3>
          <div className="authorsText">
            {data.authors.map((i) => (
              <h4>{i}</h4>
            ))}
          </div>
        </Link>
      </>
    </div>
  );
}
