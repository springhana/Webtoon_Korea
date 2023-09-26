import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SearchWebtoon from "../components/Webtoon/SearchPage/SearchWebtoon";
import Loading from "../components/Loading";

import { WebtoonsTypes } from "../types/webtoon";
import { imgSize } from "../API/data/imgSize";
import { fetchDetail_Search } from "../API/webtoon";
import styles from "../style/Webtoon/SearchPage.module.css";

function SearchPage({ TitleColor }: { TitleColor: (title: string) => string }) {
  const { title } = useParams() as { title: string };
  const [item, setItem] = useState<WebtoonsTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchDetail_Search(title);
        setItem(response.webtoons);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [title]);

  // 이미지 넓이
  function width(service: string) {
    switch (service) {
      case "naver":
        return `${imgSize[0].width}px`;
      case "kakao":
        return `${imgSize[1].width}px`;
      case "kakaoPage":
        return `${imgSize[2].width}px`;
    }
  }
  // 이미지 크기
  function height(service: string) {
    switch (service) {
      case "naver":
        return `${imgSize[0].height}px`;
      case "kakao":
        return `${imgSize[1].height}px`;
      case "kakaoPage":
        return `${imgSize[2].height}px`;
    }
  }

  return (
    <div className={styles.search}>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : item.length !== 0 ? (
        <div className={styles.search_cotainer}>
          {item.map((data: WebtoonsTypes) => (
            <SearchWebtoon
              data={data}
              width={width as (service: string) => string}
              height={height as (service: string) => string}
              key={data._id}
              TitleColor={TitleColor}
            />
          ))}
        </div>
      ) : (
        <div className={styles.search_null}>원하시는 검색어가 없습니다.</div>
      )}
    </div>
  );
}

export default SearchPage;
