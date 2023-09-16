import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../style/Board/SearchBoard.module.css";
import BoardContain from "../components/Board/BoardContain";
import { BsSearch } from "react-icons/bs";
import { BoardType } from "../types/board";
export default function SearchBoard() {
  const { value } = useParams() as { value: string };
  const [board, setBoard] = useState<BoardType[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const navigator = useNavigate();
  useEffect(() => {
    const Search = async () => {
      try {
        const response = await axios.get(`/api/search?value=${value}`);
        setBoard(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    Search();
  }, [value]);

  const Search = async () => {
    navigator(`/search/${searchKeyWord}`);
  };

  return (
    <div className={styles.search_board}>
      <div className={styles.value}>{value}</div>
      {/* 글 내용 컴포넌트 추가 */}
      <div className={styles.board_inner}>
        <div className={styles.board_contents}>
          <div className={styles.board_number}></div>
          <div className={styles.board_title}>제목</div>
          <div className={styles.board_author}>작성자</div>
          <div className={styles.board_date}>날짜</div>
        </div>
        {board &&
          board.map((data: BoardType, index: number) => (
            <div key={index}>
              <BoardContain data={data} />
            </div>
          ))}
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
