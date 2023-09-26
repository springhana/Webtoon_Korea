import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WebtoonComment from "./WebtoonComment";

import { onOpen as ImageOpen, onUrl } from "../../../store/ImageStore";
import { onOpen as LoginOpen } from "../../../store/LoginStore";

import { ReduxType } from "../../../types/redux";

import { days, daysOfWeek } from "../../../API/data/date";
import { WebtoonsTypes } from "../../../types/webtoon";
import styles from "../../../style/Webtoon/Detail/DetailPage.module.css";

import { AiFillStar } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FiSearch } from "react-icons/fi";

function DetailPage({
  data,
  width,
  height,
  img,
  TitleColor,
}: {
  data: WebtoonsTypes;
  width: number;
  height: number;
  img: (url: string) => void;
  TitleColor: (title: string) => string;
}) {
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgSize, setImgSize] = useState(1);
  const [webtoons, setWebtoons] = useState<boolean>(false); // 구독 했는지

  const login = useSelector((state: ReduxType) => {
    return state.loginCheck;
  });

  useEffect(() => {
    img(data.service);
  }, [data.service]);

  useEffect(() => {
    if (windowWidth <= 768) {
      setImgSize(0.5);
    } else if (windowWidth <= 1024) {
      setImgSize(0.8);
    } else {
      setImgSize(1);
    }

    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setImgSize(0.5);
      } else if (window.innerWidth <= 1024) {
        setImgSize(0.8);
      } else {
        setImgSize(1);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //

  useEffect(() => {
    const subscribe = async () => {
      try {
        const response = await axios.get("/api/subscribeAll");
        if (response.data) {
          const sub = response.data.title.includes(data.searchKeyword);
          setWebtoons(sub);
        }
      } catch (error) {
        console.log(error);
      }
    };

    subscribe();
  }, []);

  // 구독 취소
  const remove = async (title: string) => {
    try {
      const response = await axios.post("/api/remove_subscribe", {
        title: title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 구독
  const add = async (title: string) => {
    try {
      const response = await axios.post("/api/subscribe", {
        title: title,
      });
    } catch (errro) {
      console.log(errro);
    }
  };

  return (
    <div style={{ margin: "auto" }}>
      <div className={styles.detail}>
        <div
          style={{
            width: `${width * imgSize * 1.5}px`,
            height: `${height * imgSize * 1.5}px`,
          }}
          className={styles.img_pic}
        >
          {data.img ? (
            <img
              src={data.img}
              alt={data.title}
              onClick={() => {
                dispatch(onUrl(data.img));
                dispatch(ImageOpen());
              }}
            />
          ) : null}
          <div className={styles.icon_container}>
            <div className={styles.icon_copy}></div>
            <div className={styles.icon}>
              <FiSearch />
            </div>
          </div>
        </div>

        <div className={styles.detail_info}>
          <h2 className={styles.title}>{data.title}</h2>
          <h3 className={styles.author}>
            <span>작가</span>
            {data.author}
          </h3>
          <h3 className={styles.service}>
            <span style={{ color: TitleColor(data.service) }}>
              {data.service}
            </span>
            에서 연재중
          </h3>
          <h3 className={styles.searchKeyword}>
            <span>검색 키워드</span>#{data.searchKeyword}
          </h3>
          <div className={styles.updateDay}>
            {data.updateDays.map((day: string, index: number) => (
              <li key={index}>
                {days[daysOfWeek.findIndex((days) => days === day)]
                  ? days[daysOfWeek.findIndex((days) => days === day)]
                  : day}
              </li>
            ))}
            <span>웹툰</span>
          </div>

          <div className={styles.additional}>
            <div className={styles.fanCount}>
              {data.fanCount ? (
                <>
                  <AiFillStar />({data.fanCount}명)
                </>
              ) : null}
            </div>

            {/* 좋아요 */}
            <div>
              {webtoons ? (
                <>
                  <FcLike />
                  <span>구독 중</span>
                </>
              ) : (
                <FcLikePlaceholder />
              )}
            </div>

            <div className={styles.additional_cotainer}>
              {data.additional.new ? <div>New</div> : null}
              {data.additional.adult ? <div>19</div> : null}
              {data.additional.rest ? <div>휴재</div> : null}
              {data.additional.up ? <div>UP</div> : null}
            </div>
            {data.additional.singularityList ? (
              <div>
                {data.additional.singularityList.map(
                  (datas: string, index: number) => (
                    <li key={index}>{datas}</li>
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        {webtoons ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              remove(data.searchKeyword);
              setWebtoons(false);
            }}
            className={styles.next}
          >
            구독 해체
          </div>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (login.login) {
                add(data.searchKeyword);
                setWebtoons(true);
              } else {
                dispatch(LoginOpen());
              }
            }}
            className={styles.next}
          >
            구독
          </div>
        )}
        <a
          href={data.url}
          className={styles.go}
          target="_blank"
          rel="noopener noreferrer"
        >
          웹툰 보기
        </a>
      </div>

      {/* 댓글 */}
      <div>
        <WebtoonComment webtoonID={data._id} />
      </div>
    </div>
  );
}

export default DetailPage;
