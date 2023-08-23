import { useSelector } from "react-redux";
import WebtoonImage from "../components/WebtoonImage";
import { Link } from "react-router-dom";
import styles from "../style/WeekWebtoon.module.css";
import { WebtoonsTypes } from "../types/webtoon";
import { useCallback, useEffect, useRef, useState } from "react";
import useWebtoon from "../Hook/useWebtoon";
import WebtoonContainer from "./WebtoonContainer";

function WeekWebtoon({
  day,
  webtoon,
  Iwidth,
  Iheight,
  handleImageLoad,
  load,
}: {
  day: string;
  webtoon: string;
  Iwidth: number;
  Iheight: number;
  handleImageLoad: () => void;
  load: any;
}) {
  const [item, setItem] = useState<any>([]);

  const [pageNumber, setPageNumber] = useState<any>(0);
  const { webtoons, hasMore, loading, error } = useWebtoon(
    pageNumber,
    webtoon,
    day,
    28
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
    // const fetch = async () => {
    //   const result: any = await load(day, webtoon, 3000, 0);
    //   if (result) {
    //     setItem(result);
    //   }
    // };
    // fetch();
    // load(); // 임시 숫자
    setItem(webtoons);
  }, [day, webtoon]);
  return (
    <>
      {webtoons.map((data: WebtoonsTypes, index: number) => {
        if (webtoons.length === index + 1) {
          return (
            <div
              key={data._id}
              className={styles.WeekWebtoon_Webtoon}
              style={{ width: `${Iwidth}px`, height: `${Iheight}px` }}
            >
              <WebtoonContainer
                data={data}
                Iwidth={Iwidth}
                Iheight={Iheight}
                handleImageLoad={handleImageLoad}
                lastBookElementRef={lastBookElementRef}
              />
            </div>
          );
        } else {
          return (
            // <div
            //   key={data._id}
            //   className={styles.WeekWebtoon_Webtoon}
            //   style={{ width: `${Iwidth}px`, height: `${Iheight}px` }}
            // >
            //   <>
            //     <Link to={`/webtoon/detail/${data.title + data.author}`}>
            //       <WebtoonImage
            //         width={Iwidth}
            //         height={Iheight}
            //         img={data.img}
            //         title={data.title}
            //         adult={data.additional.adult}
            //         additional={data.additional}
            //         handleImageLoad={handleImageLoad}
            //       />
            //       <h3>
            //         {data.title.length > 10
            //           ? `${data.title.slice(0, 9)}...`
            //           : data.title}
            //       </h3>
            //       <h4>
            //         {data.author.length > 12
            //           ? `${data.author.slice(0, 12)}...`
            //           : data.author}
            //       </h4>
            //     </Link>
            //   </>
            // </div>
            <div
              key={data._id}
              className={styles.WeekWebtoon_Webtoon}
              style={{ width: `${Iwidth}px`, height: `${Iheight}px` }}
            >
              <WebtoonContainer
                data={data}
                Iwidth={Iwidth}
                Iheight={Iheight}
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
