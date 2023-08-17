import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DetailPage from "../components/DetailPage";
import { WebtoonsTypes } from "../types/webtoon";
function Detail({
  load,
  AddCheck,
  img,
  width,
  height,
  handleImageLoad,
  removeImageLoad,
  TitleColor,
}: {
  load: (title: string) => void;
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
  const webtoon_redux: any = useSelector((state: any) => {
    return state.detail_search;
  });
  useEffect(() => {
    removeImageLoad();
    load(title);
  }, []);
  console.log(page);
  function PagePlus() {
    setPage(page + 1);
  }
  function PageMinus() {
    setPage(page - 1);
  }
  if (!webtoon_redux.data) {
    return null; // 데이터가 없을 경우 렌더링하지 않음
  }
  console.log("page" + page);
  return (
    <div style={{ display: "flex", padding: "30px" }}>
      {webtoon_redux.data.webtoons.map((data: WebtoonsTypes, index: number) => (
        <>
          {index === page ? (
            <DetailPage
              data={data}
              length={webtoon_redux.data.webtoons.length}
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
        </>
      ))}
    </div>
  );
}

export default Detail;
