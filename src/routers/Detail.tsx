import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import DetailPage from "../components/Webtoon/Detail/DetailPage";

import { fetchDetail_Search } from "../API/webtoon";
import { WebtoonsTypes } from "../types/webtoon";
import { detail_Search } from "../store/Store";
import styles from "../style/Webtoon/Detail/DetailPage.module.css";

function Detail({
  img,
  width,
  height,

  TitleColor,
}: {
  img: (url: string) => void;
  width: number;
  height: number;

  TitleColor: (title: string) => string;
}) {
  const dispatch = useDispatch();
  const { title, service } = useParams() as { title: string; service: string };
  const [item, setItem] = useState<WebtoonsTypes[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchDetail_Search(title);
      setItem(response.webtoons);
      dispatch(detail_Search(title));
    };
    fetch();
  }, []);

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
          {data.provider === service.toUpperCase() ? (
            <DetailPage
              data={data}
              width={width}
              height={height}
              img={img}
              TitleColor={TitleColor}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Detail;
