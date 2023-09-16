import { useCallback, useEffect, useRef, useState } from "react";
import { days, daysOfWeek } from "../../../API/data/date";
import styles from "../../../style/Webtoon/Webtoon/DayWebtoon.module.css";
import { useNavigate } from "react-router-dom";
import services from "../../../API/data/service";
import { WebtoonType, WebtoonsTypes } from "../../../types/webtoon";
import useWebtoon from "../../../Hook/useWebtoon";
import WebtoonContainer from "../WebtoonContainer";
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
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<any>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgSize, setImgSize] = useState(1);
  const { webtoons, hasMore, loading, error } = useWebtoon(
    pageNumber,
    title,
    daysOfWeek[index]
  );

  const observer: any = useRef();
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect(); // 관찰자의 현재점 끊기
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber: any) => prevPageNumber + 1);
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
      setImgSize(0.3);
    } else if (windowWidth <= 1024) {
      setImgSize(0.6);
    } else {
      setImgSize(1);
    }

    if (
      title === services[0] ||
      title === services[1] ||
      title === services[2]
    ) {
      setPageNumber(0);
    } else {
      navigate("/not-found");
    }
  }, [title]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setImgSize(0.3);
      } else if (window.innerWidth <= 1024) {
        setImgSize(0.6);
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
    <div
      className={styles.dayWebtoon}
      style={{ width: `${Iwidth * imgSize}px` }}
    >
      <h3>{days[index]}</h3>
      {webtoons.map((data: WebtoonsTypes, index: number) => {
        if (webtoons.length === index + 1) {
          return (
            <div key={index}>
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
            <div key={index}>
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
    </div>
  );
}

export default DayWebtoon;
