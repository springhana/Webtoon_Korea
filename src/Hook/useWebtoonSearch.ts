import { useEffect, useState } from "react";
import axios from "axios";

export default function useWebtoonSearch(keyword: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [webtoons, setWebtoons] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false); // 사용자의 상태?

  useEffect(() => {
    setWebtoons([]);
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: any;
    axios({
      method: "GET",
      url: "https://korea-webtoon-api.herokuapp.com/search?",
      params: {
        keyword: keyword,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)), // axios 취소 방법
    })
      .then((res) => {
        setWebtoons((prevWebtoon: any) => {
          return [
            ...new Set([
              ...prevWebtoon,
              ...res.data.webtoons.map((webtoon: any) => webtoon),
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
    return () => cancel();
  }, [keyword]);
  return { loading, error, webtoons, hasMore };
}
