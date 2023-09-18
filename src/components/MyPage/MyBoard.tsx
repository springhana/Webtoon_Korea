import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../style/MyPage/MyBoard.module.css";
import BoardContain from "../Board/BoardContain";
import { useNavigate } from "react-router-dom";
import { BoardType } from "../../types/board";
import Loading from "../Loading";
export default function MyBoard() {
  const [board, setBoard] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]); // 페이지를 보여줄 배열 [1,2,3,4,5]
  const [firstPage, setFirstPage] = useState<number>(1); // 처음 페이지 (초기값 1)
  const [totalPost, setTotalPost] = useState(0);
  const navigator = useNavigate();
  useEffect(() => {
    const MyBoard = async () => {
      try {
        const response = await axios.get("/api/myBoard", {
          params: { page: page },
        });

        setBoard(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    MyBoard();
  }, [page]);

  return (
    <div className={styles.board}>
      {/* 글 내용 컴포넌트 추가 */}

      {loading ? (
        <div className="Loading">
          <Loading />
        </div>
      ) : (
        <>
          <div className={styles.board_inner}>
            <div className={styles.board_contents}>
              <div className={styles.board_number}></div>
              <div className={styles.board_title}>제목</div>
              <div className={styles.board_author}>작성자</div>
              <div className={styles.board_date}>날짜</div>
            </div>
          </div>
          {board.map((data: BoardType, index: number) => (
            <div key={index} className={styles.myBoard}>
              <BoardContain data={data} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
