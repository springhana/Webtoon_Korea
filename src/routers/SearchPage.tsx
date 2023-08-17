import { useEffect } from "react";
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
  const webtoon_redux: any = useSelector((state: any) => {
    return state.detail_search;
  });
  useEffect(() => {
    removeImageLoad();
    load(title);
  }, []);

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
      {webtoon_redux.data !== null ? (
        <div className={styles.search_cotainer}>
          {webtoon_redux.data.webtoons.map((data: WebtoonsTypes) => (
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
      ) : null}
    </div>
  );
}

export default SearchPage;
