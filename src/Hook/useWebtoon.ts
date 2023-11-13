import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { WebtoonType, WebtoonsTypes } from "../types/webtoon";

export default function useWebtoon(
  pageNumber: number,
  service: string,
  updateDay: string,
  perPage: number = 10
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [webtoons, setWebtoons] = useState<WebtoonsTypes[]>([]);
  const [hasMore, setHasMore] = useState(false); // 사용자의 상태?

  useEffect(() => {
    setHasMore(false);
    setWebtoons([]);
  }, [service, updateDay]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: CancelTokenSource;

    const source = axios.CancelToken.source();
    cancel = source;
    axios({
      method: "GET",
      url: "https://korea-webtoon-api.herokuapp.com",
      params: {
        page: pageNumber,
        service: service,
        updateDay: updateDay,
        perPage: perPage,
      },
      cancelToken: source.token,
    })
      .then((res) => {
        setWebtoons((prevWebtoon) => {
          return [
            ...new Set([
              ...prevWebtoon,
              ...res.data.webtoons.map((webtoon: WebtoonType) => webtoon),
            ]),
          ];
        });
        setHasMore(res.data.webtoons.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => {
      if (cancel) {
        cancel.cancel("Request canceled");
      }
    };
  }, [pageNumber, service, updateDay]);
  return { loading, error, webtoons, hasMore };
}
