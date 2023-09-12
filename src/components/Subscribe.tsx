import axios from "axios";
import { imgSize } from "../API/data/imgSize";
import useWebtoonSearch from "../Hook/useWebtoonSearch";
import WebtoonImage from "./WebtoonImage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../style/MyPage/Subscribe.module.css";

export default function Subscribe({ webtoon, img, Iwidth, Iheight }: any) {
  const { webtoons, hasMore, loading, error } = useWebtoonSearch(webtoon);
  const [구취, set구취] = useState(false);
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
      console.log(response);
    } catch (errro) {
      console.log(errro);
    }
  };

  return (
    <div>
      <div className={styles.myPage_container}>
        {hasMore
          ? webtoons.map((data: any, index: number) => (
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

                    {구취 ? (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          add(data.searchKeyword);
                          set구취(false);
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
                          set구취(true);
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
