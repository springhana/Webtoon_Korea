import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { imgSize } from "../API/data/imgSize";
import SearchWebtoon from "../components/SearchWebtoon";
import styles from "../style/SearchPage.module.css";
import { WebtoonsTypes } from "../types/webtoon";
function SearchPage({
  load,
  TitleColor,
  handleImageLoad,
  removeImageLoad,
}: {
  load: (title: string) => void;
  TitleColor: (title: string) => string;
  handleImageLoad: () => void;
  removeImageLoad: () => void;
}) {
  const { title }: any = useParams();

  const [item, setItem] = useState<any>([]);
  useEffect(() => {
    const fetch = async () => {
      const result: any = await load(title);
      if (result) {
        setItem(result);
      }
    };
    fetch();
    removeImageLoad();
  }, [title]);

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
      {item.length > 0 ? (
        <div className={styles.search_cotainer}>
          {item.map((data: WebtoonsTypes) => (
            <SearchWebtoon
              data={data}
              width={width as (service: string) => string}
              height={height as (service: string) => string}
              key={data._id}
              TitleColor={TitleColor}
              handleImageLoad={handleImageLoad}
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
