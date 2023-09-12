import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../style/Board/MyBoard.module.css";
import BoardContain from "./BoardContain";
import { useNavigate } from "react-router-dom";
export default function MyBoard() {
  const [board, setBoard] = useState<any>([]);
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
        // 페이징 - 처음 페이지 (5 => 1 이 되어야함 7 => 6)
        const firstPage =
          Math.floor((response.data.currentPage - 1) / 5) * 5 + 1;
        // console.log(firstPage);
        let pagesArr = []; // 페이지를 담을 배열

        // 페이지 담기 5개 씩
        for (let i = 0; i < 5; i++) {
          // 페이지가 총 페이지보다 작으면
          if (firstPage + i <= response.data.totalPages) {
            pagesArr.push(firstPage + i);
          }
        }
        setFirstPage(firstPage);
        setPages(pagesArr);
        // ===========

        setBoard(response.data.result);
        setTotalPost(response.data.totalPages);
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
      <div className={styles.board_inner}>
        <div className={styles.board_contents}>
          <div className={styles.board_number}></div>
          <div className={styles.board_title}>제목</div>
          <div className={styles.board_author}>작성자</div>
          <div className={styles.board_date}>날짜</div>
        </div>
      </div>
      {loading
        ? null
        : board.map((data: any, index: number) => (
            <div key={index} className={styles.myBoard}>
              <BoardContain data={data} />
            </div>
          ))}

      {/* 페이지 */}
      <div className={styles.paging}>
        <ul>
          {/* 이전 */}
          <li
            className={styles.prev}
            style={
              page === 1 ? { opacity: 0.5, cursor: "default" } : { opacity: 1 }
            }
          >
            <div
              onClick={() => {
                if (page !== 1) {
                  setPage((prev) => (prev -= 1));
                }
              }}
            >
              이전
            </div>
          </li>

          {pages.map((date: any) => {
            return (
              <li key={date}>
                <div
                  onClick={() => {
                    setPage((prev) => (prev = date));
                  }}
                  className={date === page ? styles.nowPage : null}
                >
                  {date}
                </div>
              </li>
            );
          })}

          {/* 다음 */}
          <li
            className={styles.next}
            style={
              totalPost === page
                ? { opacity: 0.5, cursor: "default" }
                : { opacity: 1 }
            }
          >
            <div
              onClick={() => {
                if (totalPost !== page) {
                  setPage((prev) => (prev += 1));
                }
              }}
            >
              다음
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
