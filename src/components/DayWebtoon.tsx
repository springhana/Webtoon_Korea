import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { days, daysOfWeek } from "../API/data/date";
import styles from "../style/DayWebtoon.module.css";
import { Link, useNavigate } from "react-router-dom";
import services from "../API/data/service";
import Loading from "./Loading/Loading";
import { WebtoonType, WebtoonsTypes } from "../types/webtoon";
import useWebtoon from "../Hook/useWebtoon";
import WebtoonContainer from "./WebtoonContainer";
import WebtoonImage from "./WebtoonImage";
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
  // const [item, setItem] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<any>(0);
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

  console.log(webtoons, hasMore, loading, error);
  useEffect(() => {
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
  // useEffect(() => {
  //   const fetch = async () => {
  //     const result: any = await load(day, title, 300, 0);
  //     if (result) {
  //       console.log(result);
  //       setItem(result);
  //     }
  //   };

  //   if (
  //     title === services[0] ||
  //     title === services[1] ||
  //     title === services[2]
  //   ) {
  //     fetch();
  //     size(item);
  //   } else {
  //     navigate("/not-found");
  //   }
  // }, [title, size, perPage]);

  return (
    <div className={styles.dayWebtoon} style={{ width: `${Iwidth + 5}px` }}>
      <h3>{days[index]}</h3>
      {webtoons.map((data: WebtoonsTypes, index: number) => {
        if (webtoons.length === index + 1) {
          return (
            // <div
            //   key={data._id}
            //   className={styles.dayWebtoon_Webtoon}
            //   ref={lastBookElementRef}
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
            //         {data.title.length > 8
            //           ? `${data.title.slice(0, 8)}...`
            //           : data.title}
            //       </h3>
            //       <h3>
            //         {data.author.length > 8
            //           ? `${data.author.slice(0, 8)}...`
            //           : data.author}
            //       </h3>
            //     </Link>
            //   </>
            // </div>
            <WebtoonContainer
              data={data}
              Iwidth={Iwidth}
              Iheight={Iheight}
              handleImageLoad={handleImageLoad}
              lastBookElementRef={lastBookElementRef}
            />
          );
        } else {
          return (
            // <div key={data._id} className={styles.dayWebtoon_Webtoon}>
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
            //         {data.author.length > 8
            //           ? `${data.author.slice(0, 8)}...`
            //           : data.author}
            //       </h3>
            //     </Link>
            //   </>
            // </div>
            <>
              <WebtoonContainer
                data={data}
                Iwidth={Iwidth}
                Iheight={Iheight}
                handleImageLoad={handleImageLoad}
              />
            </>
          );
        }
      })}
    </div>
  );
}

export default DayWebtoon;
