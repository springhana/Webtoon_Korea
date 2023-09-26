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
      key={data._id}
      className={styles.dayWebtoon_Webtoon}
      ref={lastBookElementRef}
    >
      <>
        <Link
          to={`/webtoon/detail/${data.title + data.author}/${data.service}`}
        >
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
          <h3>
            {data.author.length > 8
              ? `${data.author.slice(0, 8)}...`
              : data.author}
          </h3>
        </Link>
      </>
    </div>
  );
}
