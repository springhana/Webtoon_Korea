import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { BoardType, Paging } from "../types/board";

export default function useBoard(page: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [board, setBoard] = useState<Paging>({
    currentPage: 0,
    result: [],
    totalPages: 0,
  });
  const [hasMore, setHasMore] = useState(false); // 사용자의 상태?
  useEffect(() => {
    setBoard({
      currentPage: 0,
      result: [],
      totalPages: 0,
    });
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: CancelTokenSource;

    const source = axios.CancelToken.source();
    cancel = source;
    axios({
      method: "GET",
      url: "/api/board/",
      params: { page: page },
      cancelToken: source.token,
    })
      .then((res) => {
        setBoard(res.data);
        setHasMore(res.data.result.length > 0);
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
  }, [page]);
  return { loading, error, board, hasMore };
}
