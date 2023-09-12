import Additional from "./Additional";
import LazyLoad from "react-lazy-load";
import styles from "../style/WebtoonImage.module.css";
import { AdditionalType } from "../types/webtoon";
function WebtoonImage({
  width,
  height,
  img,
  title,
  adult,
  additional,
  handleImageLoad,
}: {
  width: number;
  height: number;
  img: string;
  title: string;
  adult: boolean;
  additional: AdditionalType;
  handleImageLoad?: () => void;
}) {
  return (
    <div
      className={styles.webtoon_img_pic}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <LazyLoad height={height} offset={50}>
        <img
          src={img}
          alt={title}
          className={styles.webtoon_img}
          onLoad={handleImageLoad}
        />
      </LazyLoad>
      {adult ? <div className={styles.screen}></div> : null}
      <Additional additional={additional} />
    </div>
  );
}

export default WebtoonImage;
