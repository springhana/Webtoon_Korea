import { days, daysOfWeek } from "../API/data/date";
import styles from "../style/DetailPage.module.css";
import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { WebtoonsTypes } from "../types/webtoon";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { onOpen } from "../store/LoginStore";
import WebtoonComment from "./WebtoonComment";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
function DetailPage({
  data,
  page,
  length,
  PagePlus,
  PageMinus,
  AddCheck,
  width,
  height,
  img,
  handleImageLoad,
  TitleColor,
}: {
  data: WebtoonsTypes;
  page: number;
  length: number;
  PagePlus: () => void;
  PageMinus: () => void;
  AddCheck: (url: string, title: string, service: string) => void;
  width: number;
  height: number;
  img: (url: string) => void;
  handleImageLoad: () => void;
  TitleColor: (title: string) => string;
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgSize, setImgSize] = useState(1);
  const login = useSelector((state: any) => {
    return state.loginCheck;
  });
  const dispatch = useDispatch();

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
  }, []);

  useEffect(() => {
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

  const [webtoons, setWebtoons] = useState<boolean>(false);
  useEffect(() => {
    const subscribe = async () => {
      try {
        const response = await axios.get(
          "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/subscribeAll"
        );
        if (response.data) {
          const a = response.data.title.includes(data.searchKeyword);
          console.log(a);
          setWebtoons(a);
        }
      } catch (error) {
        console.log(error);
      }
    };

    subscribe();
  }, []);

  const remove = async (title: string) => {
    try {
      const response = await axios.post(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/remove_subscribe",
        {
          title: title,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const add = async (title: string) => {
    try {
      const response = await axios.post(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/subscribe",
        {
          title: title,
        }
      );
    } catch (errro) {
      console.log(errro);
    }
  };
  return (
    <div style={{ margin: "auto" }}>
      <div className={styles.detail}>
        <div
          onClick={() => AddCheck(data.img, data.title, data.service)}
          style={{
            width: `${width * imgSize * 1.5}px`,
            height: `${height * imgSize * 1.5}px`,
          }}
          className={styles.img_pic}
        >
          <img src={data.img} alt={data.title} onLoad={handleImageLoad} />
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
              add(data.searchKeyword);
              setWebtoons(true);
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
        {/* {page + 1 < length ? (
          <div onClick={PagePlus} className={styles.next}>
            넘기기
          </div>
        ) : null}
        {page > 0 ? (
          <div onClick={PageMinus} className={styles.next}>
            전으로
          </div>
        ) : null} */}
      </div>

      {/* 댓글 */}
      <div>
        <WebtoonComment webtoonID={data._id} />
      </div>
    </div>
  );
}

export default DetailPage;
