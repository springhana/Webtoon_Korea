import useBoard from "../Hook/useBoard";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardContain from "../components/Board/BoardContain";
import styles from "../style/Board/Board.module.css";
import { BsSearch } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { BoardType } from "../types/board";
import { ReduxType } from "../types/redux";
import { onOpen } from "../store/LoginStore";
export default function Board() {
  const { page } = useParams() as { page: string };
  const { loading, error, board, hasMore } = useBoard(parseInt(page));
  const [pages, setPages] = useState<number[]>([]); // 페이지를 보여줄 배열 [1,2,3,4,5]
  const [firstPage, setFirstPage] = useState<number>(1); // 처음 페이지 (초기값 1)
  //   console.log(loading, error, board, hasMore);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

  const loginCheck = useSelector((state: ReduxType) => {
    return state.loginCheck;
  });

  useEffect(() => {
    console.log(board);
    // 처음 페이지 (5 => 1 이 되어야함 7 => 6)
    const firstPage = Math.floor((board.currentPage - 1) / 5) * 5 + 1;
    let pagesArr = []; // 페이지를 담을 배열

    // 페이지 담기 5개 씩
    for (let i = 0; i < 5; i++) {
      // 페이지가 총 페이지보다 작으면
      if (firstPage + i <= board.totalPages) {
        pagesArr.push(firstPage + i);
      }
    }
    console.log(pagesArr);
    setFirstPage(firstPage);
    setPages(pagesArr);
  }, [board.currentPage, board.totalPages]);

  const Search = async () => {
    navigator(`/search/${searchKeyWord}`);
  };

  return (
    <div className={styles.board}>
      {/* 글쓰기 로그인 시 */}
      <div className={styles.board_logo}>
        <h3>만화 게시판</h3>
        <div
          className={styles.write}
          onClick={() => {
            if (loginCheck.login) {
              navigator("/board/write");
            } else {
              // navigator("/board/write");
              dispatch(onOpen());
            }
          }}
        >
          <span>
            <FaPencilAlt />
          </span>
          글쓰기
        </div>
      </div>

      {/* 글 내용 컴포넌트 추가 */}
      <div className={styles.board_inner}>
        <div className={styles.board_contents}>
          <div className={styles.board_number}></div>
          <div className={styles.board_title}>제목</div>
          <div className={styles.board_author}>작성자</div>
          <div className={styles.board_date}>날짜</div>
        </div>
        {board.result &&
          board.result.map((data: BoardType, index: number) => (
            <div key={index} className={styles.boards}>
              <BoardContain data={data} />
            </div>
          ))}
      </div>

      {/* 페이지 */}
      <div className={styles.paging}>
        <ul>
          {/* 이전 */}
          <li
            className={styles.prev}
            style={
              parseInt(page) === 1
                ? { opacity: 0.5, cursor: "default" }
                : { opacity: 1 }
            }
          >
            <div
              onClick={() => {
                if (parseInt(page) !== 1) {
                  navigator(`/board/${parseInt(page) - 1}`);
                }
              }}
            >
              이전
            </div>
          </li>

          {pages.map((date) => {
            return (
              <li key={date}>
                <div
                  onClick={() => {
                    navigator(`/board/${date}`);
                  }}
                  className={date === parseInt(page) ? styles.nowPage : null}
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
              board.totalPages === parseInt(page)
                ? { opacity: 0.5, cursor: "default" }
                : { opacity: 1 }
            }
          >
            <div
              onClick={() => {
                if (board.totalPages !== parseInt(page)) {
                  navigator(`/board/${parseInt(page) + 1}`);
                }
              }}
            >
              다음
            </div>
          </li>
        </ul>
      </div>

      {/* 검색  */}
      <div className={styles.search}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="검색해주세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchKeyWord(e.target.value);
          }}
        />
        <div onClick={Search} className={styles.search_icon}>
          <BsSearch />
        </div>
      </div>
    </div>
  );
}
