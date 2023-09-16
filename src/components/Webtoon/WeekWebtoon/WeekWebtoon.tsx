import styles from "../../../style/Webtoon/WeekWebtoon/WeekWebtoon.module.css";
import { WebtoonsTypes } from "../../../types/webtoon";
import { useCallback, useEffect, useRef, useState } from "react";
import useWebtoon from "../../../Hook/useWebtoon";
import WebtoonContainer from "../WebtoonContainer";

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
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgSize, setImgSize] = useState(1);

  const { webtoons, hasMore, loading, error } = useWebtoon(
    pageNumber,
    webtoon,
    day,
    windowWidth > 1024 ? 28 : 24
  );

  const observer: any = useRef();
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect(); // 관찰자의 현재점 끊기
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (windowWidth <= 768) {
      setImgSize(1.1);
    } else if (windowWidth <= 1024) {
      setImgSize(1.1);
    } else {
      setImgSize(1);
    }

    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setImgSize(1.1);
      } else if (window.innerWidth <= 1024) {
        setImgSize(1.1);
      } else {
        setImgSize(1);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {webtoons.map((data: WebtoonsTypes, index: number) => {
        if (webtoons.length === index + 1) {
          return (
            <div
              key={data._id}
              className={styles.WeekWebtoon_Webtoon}
              style={{ width: `${Iwidth * imgSize}px` }}
            >
              <WebtoonContainer
                data={data}
                Iwidth={Iwidth * imgSize}
                Iheight={Iheight * imgSize}
                handleImageLoad={handleImageLoad}
                lastBookElementRef={lastBookElementRef}
              />
            </div>
          );
        } else {
          return (
            <div
              key={data._id}
              className={styles.WeekWebtoon_Webtoon}
              style={{ width: `${Iwidth * imgSize}px` }}
            >
              <WebtoonContainer
                data={data}
                Iwidth={Iwidth * imgSize}
                Iheight={Iheight * imgSize}
                handleImageLoad={handleImageLoad}
              />
            </div>
          );
        }
      })}
    </>
  );
}
export default WeekWebtoon;
