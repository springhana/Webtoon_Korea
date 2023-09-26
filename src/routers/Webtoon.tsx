import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import DayWebtoon from "../components/Webtoon/Webtoon/DayWebtoon";
import Category from "../components/Webtoon/Category";
import Loading from "../components/Loading";

import { daysOfWeek } from "../API/data/date";
import styles from "../style/Webtoon/Webtoon.module.css";

function Webtoon({
  img,
  Iwidth,
  Iheight,
}: {
  img: (url: string, size: number) => void;
  Iwidth: number;
  Iheight: number;
}) {
  const { webtoon } = useParams() as { webtoon: string };
  const [isImageLoaded, setImageLoaded] = useState(false);

  const location = useLocation();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setImageLoaded(false);
    img(location.pathname.split("/")[2], 0.7);
  }, [location]);

  return (
    <div className={styles.webtoonContainer}>
      <div>
        <Category />
      </div>
      <div>
        <div className={styles.webtoon}>
          {daysOfWeek.map((day: string, index: number) => (
            <div key={index}>
              <DayWebtoon
                title={webtoon as string}
                index={index}
                Iwidth={Iwidth}
                Iheight={Iheight}
                webtoon={webtoon}
                handleImageLoad={handleImageLoad}
              />
            </div>
          ))}
        </div>
      </div>

      {isImageLoaded ? null : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}
export default Webtoon;
