import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imgSize } from "../API/data/imgSize";
import SearchWebtoon from "../components/Webtoon/SearchPage/SearchWebtoon";
import styles from "../style/Webtoon/SearchPage.module.css";
import { WebtoonsTypes } from "../types/webtoon";
import { fetchDetail_Search } from "../API/webtoon";
function SearchPage({
  TitleColor,
  handleImageLoad,
  removeImageLoad,
}: {
  TitleColor: (title: string) => string;
  handleImageLoad: () => void;
  removeImageLoad: () => void;
}) {
  const { title } = useParams() as { title: string };
  const [loading, setLoading] = useState(true);

  const [item, setItem] = useState<WebtoonsTypes[]>([]);
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
    removeImageLoad();
  }, [title]);
  console.log(item);
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
      {loading ? (
        <div className={styles.search_null}>원하시는 검색어가 없습니다.</div>
      ) : (
        item && (
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
        )
      )}
    </div>
  );
}

export default SearchPage;
