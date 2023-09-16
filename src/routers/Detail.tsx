import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import DetailPage from "../components/Webtoon/Detail/DetailPage";
import { WebtoonsTypes } from "../types/webtoon";
import { detail_Search } from "../store/Store";

import styles from "../style/Webtoon/Detail/DetailPage.module.css";
import { fetchDetail_Search } from "../API/webtoon";
function Detail({
  AddCheck,
  img,
  width,
  height,
  handleImageLoad,
  removeImageLoad,
  TitleColor,
}: {
  AddCheck: (url: string, title: string, service: string) => void;
  img: (url: string) => void;
  width: number;
  height: number;
  handleImageLoad: () => void;
  removeImageLoad: () => void;
  TitleColor: (title: string) => string;
}) {
  const [page, setPage] = useState(0);
  useMemo(() => page, []);
  const { title } = useParams() as { title: string };
  const [item, setItem] = useState<WebtoonsTypes[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchDetail_Search(title);
      setItem(response.webtoons);
      dispatch(detail_Search(title));
    };
    fetch();
    removeImageLoad();
  }, []);

  function PagePlus() {
    setPage(page + 1);
  }
  function PageMinus() {
    setPage(page - 1);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
      }}
    >
      {item.map((data: WebtoonsTypes, index: number) => (
        <div key={index} className={styles.detailPage}>
          {index === page ? (
            <DetailPage
              data={data}
              length={item.length}
              page={page}
              PagePlus={PagePlus}
              PageMinus={PageMinus}
              AddCheck={AddCheck}
              width={width}
              height={height}
              img={img}
              handleImageLoad={handleImageLoad}
              TitleColor={TitleColor}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Detail;
