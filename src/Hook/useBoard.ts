import { useEffect, useState } from "react";
import axios from "axios";

export default function useBoard(page: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [board, setBoard] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false); // 사용자의 상태?
  useEffect(() => {
    setBoard([]);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: any;
    axios({
      method: "GET",
      url: "/https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/board/",
      params: { page: page },
      cancelToken: new axios.CancelToken((c) => (cancel = c)), // axios 취소 방법
    })
      .then((res) => {
        setBoard((prevBoard: any) => {
          return res.data;
        });
        setHasMore(res.data.result.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [page]);
  return { loading, error, board, hasMore };
}
