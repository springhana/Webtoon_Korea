import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import useWebtoonSearch from "../../Hook/useWebtoonSearch";

import WebtoonImage from "../Webtoon/WebtoonImage";

import { WebtoonsTypes } from "../../types/webtoon";
import styles from "../../style/MyPage/Subscribe.module.css";

export default function Subscribe({
  webtoon,
  Iwidth,
  Iheight,
}: {
  webtoon: string;
  Iwidth: (service: string) => string;
  Iheight: (service: string) => string;
}) {
  const { webtoons, hasMore, loading, error } = useWebtoonSearch(webtoon);
  const [subscribe, setSubscribe] = useState(false);

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
      console.log(response);
    } catch (errro) {
      console.log(errro);
    }
  };

  return (
    <div>
      <div className={styles.myPage_container}>
        {hasMore
          ? webtoons.map((data: WebtoonsTypes, index: number) => (
              <div key={index}>
                {index === 0 ? (
                  <>
                    <Link to={`/webtoon/detail/${data.title}`}>
                      <div className={styles.webtoon}>
                        <WebtoonImage
                          width={parseInt(Iwidth(data.service))}
                          height={parseInt(Iheight(data.service))}
                          img={data.img}
                          title={data.title}
                          adult={data.additional.adult}
                          additional={data.additional}
                        />
                        <div className={styles.webtoon_service}>
                          <div>
                            {data.title.length > 10
                              ? `${data.title.slice(0, 10)}...`
                              : data.title}
                          </div>
                          <div>
                            {data.author.length > 10
                              ? `${data.author.slice(0, 10)}...`
                              : data.author}
                          </div>
                        </div>
                      </div>
                    </Link>

                    {subscribe ? (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          add(data.searchKeyword);
                          setSubscribe(false);
                        }}
                        className={styles.subscribe}
                      >
                        구독
                      </div>
                    ) : (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          remove(data.searchKeyword);
                          setSubscribe(true);
                        }}
                        className={styles.subscribe}
                      >
                        구독 해체
                      </div>
                    )}

                    <div className={styles.before}></div>
                  </>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
