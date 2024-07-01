import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import WebtoonImage from "../Webtoon/WebtoonImage";
import ArrowBtn from "../ArrowBtn";

import today from "../../API/data/day";
import { KdaysOfWeek } from "../../API/data/date";
import { WebtoonsTypes } from "../../types/webtoon";

import styles from "../../style/Home/webtoons.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";

function Webtoons({
  title,
  load,
  size,
  TitleColor,
}: {
  title: string;
  load: (today: string, title: string) => void;
  size: { width: number; height: number };
  TitleColor: (title: string) => string;
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

  const [item, setItem] = useState<WebtoonsTypes[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgLength, setImgLength] = useState<number>(5);

  useEffect(() => {
    const fetch = async () => {
      const result: any = await load(today, title);
      if (result) {
        setItem(result);
      }
    };

    if (windowWidth <= 768) {
      setImgLength(1);
    } else if (windowWidth <= 1024) {
      setImgLength(3);
    } else {
      setImgLength(5);
    }

    fetch();
  }, [title]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setImgLength(1);
      } else if (window.innerWidth <= 1024) {
        setImgLength(3);
      } else {
        setImgLength(5);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function move(type: string) {
    if (imgPic.current !== null) {
      let copy = chanal;
      if (
        type === "next" &&
        chanal < imgPic.current.childElementCount / imgLength
      ) {
        imgPic.current.style.transform += `translateX(-${
          WebtoonSize * imgLength
        }px)`;
        setCanal((prevCanal) => prevCanal + 1);
        copy += 1;
      } else if (type === "prev" && chanal > 1) {
        imgPic.current.style.transform += `translateX(${
          WebtoonSize * imgLength
        }px)`;
        setCanal((prevCanal) => prevCanal - 1);
        copy -= 1;
      }

      if (copy <= 1) {
        setPrevCheck(false);
      } else {
        setPrevCheck(true);
      }

      if (copy >= imgPic.current.childElementCount / imgLength) {
        setNextCheck(false);
      } else {
        setNextCheck(true);
      }
    }
  }

  return (
    <div
      className={styles.webtoons}
      style={{ height: `${size.height * 1.8}px` }}
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
            <div key={data.id} className={styles.webtoon}>
              <Link to={`/webtoon/detail/${data.title}/${data.provider}`}>
                <WebtoonImage
                  width={size.width}
                  height={size.height}
                  img={data.thumbnail[0]}
                  title={data.title}
                  adult={data.ageGrade}
                  additional={{
                    adult: data.ageGrade > 18,
                    isUpdated: data.isUpdated,
                  }}
                />
                <h3>
                  {data.title.length > 13
                    ? `${data.title.slice(0, 12)}...`
                    : data.title}
                </h3>

                <div className="authorsText">
                  {data.authors.map((i) => (
                    <h4>{i}</h4>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Webtoons;
