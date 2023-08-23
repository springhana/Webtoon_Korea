import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../style/webtoons.module.css";
import { Link } from "react-router-dom";
import { KdaysOfWeek } from "../API/data/date";
import ArrowBtn from "./ArrowBtn";

import { MdKeyboardArrowRight } from "react-icons/md";
import WebtoonImage from "./WebtoonImage";
import today from "../API/data/day";
import { WebtoonsTypes } from "../types/webtoon";
function Webtoons({
  title,
  load,
  size,
  TitleColor,
  handleImageLoad,
}: {
  title: string;
  load: (today: string, title: string) => void;
  size: { width: number; height: number };
  TitleColor: (title: string) => string;
  handleImageLoad: () => void;
}) {
  const [WebtoonSize] = useState(240);
  const [chanal, setCanal] = useState(1);
  const [nextCheck, setNextCheck] = useState(true);
  const [prevCheck, setPrevCheck] = useState(false);
  const imgPic: React.RefObject<HTMLDivElement> =
    useRef() as React.RefObject<HTMLDivElement>;
  const prev: React.RefObject<HTMLDivElement> =
    useRef() as React.RefObject<HTMLDivElement>;
  const next: React.RefObject<HTMLDivElement> =
    useRef() as React.RefObject<HTMLDivElement>;

  const [item, setItem] = useState<any>([]);
  useEffect(() => {
    const fetch = async () => {
      const result: any = await load(today, title);
      if (result) {
        console.log(result);
        setItem(result);
      }
    };
    fetch();
  }, [title]);

  function move(type: string) {
    if (imgPic.current !== null) {
      let copy = chanal;
      if (type === "next" && chanal < imgPic.current.childElementCount / 5) {
        imgPic.current.style.transform += `translateX(-${WebtoonSize * 5}px)`;
        setCanal((prevCanal) => prevCanal + 1);
        copy += 1;
      } else if (type === "prev" && chanal > 1) {
        imgPic.current.style.transform += `translateX(${WebtoonSize * 5}px)`;
        setCanal((prevCanal) => prevCanal - 1);
        copy -= 1;
      }

      if (copy <= 1) {
        setPrevCheck(false);
      } else {
        setPrevCheck(true);
      }

      if (copy >= imgPic.current.childElementCount / 5) {
        setNextCheck(false);
      } else {
        setNextCheck(true);
      }
    }
  }

  return (
    <div
      className={styles.webtoons}
      style={{ height: `${size.height * 1.5}px` }}
    >
      <div className={styles.webtoons_nav}>
        <h2 className={styles.title} style={{ color: TitleColor(title) }}>
          {title}
        </h2>
        <p>
          <Link to={`/webtoon/week/${title}/${KdaysOfWeek}`}>
            더 보기 <MdKeyboardArrowRight />
          </Link>
        </p>
      </div>
      <ArrowBtn
        move={move}
        prev={prev}
        next={next}
        size={size}
        nextCheck={nextCheck}
        prevCheck={prevCheck}
      />
      <div className={styles.webtoons_inner}>
        <div className={styles.webtoons_container} ref={imgPic}>
          {item.map((data: WebtoonsTypes) => (
            <div key={data._id} className={styles.webtoon}>
              <Link to={`/webtoon/detail/${data.title + data.author}`}>
                <WebtoonImage
                  width={size.width}
                  height={size.height}
                  img={data.img}
                  title={data.title}
                  adult={data.additional.adult}
                  additional={data.additional}
                  handleImageLoad={handleImageLoad}
                />
                <h3>
                  {data.title.length > 13
                    ? `${data.title.slice(0, 12)}...`
                    : data.title}
                </h3>
                <h4>
                  {data.author.length > 13
                    ? `${data.author.slice(0, 12)}...`
                    : data.author}
                </h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Webtoons;
