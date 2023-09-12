import { useLocation, useParams } from "react-router-dom";
import DayWebtoon from "../components/DayWebtoon";
import { daysOfWeek } from "../API/data/date";
import { useEffect, useState, useMemo } from "react";
import Category from "../components/Category";
import styles from "../style/Webtoon.module.css";
import { WebtoonType } from "../types/webtoon";
import Loading from "../components/Loading/Loading";

function Webtoon({
  load,
  img,
  Iwidth,
  Iheight,
  handleImageLoad,
  removeImageLoad,
  isImageLoaded,
}: {
  load: (day: string, webtoon: string, perPage?: number, page?: number) => void;
  img: (url: string, size: number) => void;
  Iwidth: number;
  Iheight: number;
  handleImageLoad: () => void;
  removeImageLoad: () => void;
  isImageLoaded: boolean;
}) {
  const location = useLocation();
  const { webtoon } = useParams() as { webtoon: string };

  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    removeImageLoad();
    img(location.pathname.split("/")[2], 0.7);
    setPerPage(10);
  }, [location]); //2747
  // useState를 사용하여 상태 값 설정
  const [pageSize, setPageSize] = useState(10);

  // useMemo를 사용하여 숫자 초기값을 메모이제이션
  useMemo(() => pageSize, []);
  let copy_pageSize: number = 0;
  function size(size: WebtoonType) {
    if (start) {
      copy_pageSize = Math.max(copy_pageSize, size.length);
      setPageSize(copy_pageSize);
    }
  }

  const [start, setStart] = useState(false);

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
                day={day}
                load={load}
                title={webtoon as string}
                index={index}
                Iwidth={Iwidth}
                Iheight={Iheight}
                perPage={perPage}
                size={size}
                handleImageLoad={handleImageLoad}
              />
            </div>
          ))}
        </div>
        {isImageLoaded ? null : (
          <div className="Loading">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
export default Webtoon;
