import { useEffect, useState } from "react";
import axios from "axios";

import BoardContain from "../Board/BoardContain";
import Loading from "../Loading";

import { BoardType } from "../../types/board";
import styles from "../../style/Profile/MyBoard.module.css";

import { FaChalkboard } from "react-icons/fa";

export default function MyBoard({ _id }: { _id: string }) {
  const [board, setBoard] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 유저 게시판 글 가져오기
    const Board_fetch = async () => {
      try {
        const response = await axios.get("/api/userBoard", {
          params: { _id: _id },
        });
        setBoard(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    Board_fetch();
  }, []);

  return (
    <div>
      <div className={styles.board_inner}>
        <div className={styles.board_contents}>
          <div className={styles.board_number}>
            <FaChalkboard color="green" />
            &nbsp;
            {board.length}
          </div>
          <div className={styles.board_title}>제목</div>
          <div className={styles.board_author}>작성자</div>
          <div className={styles.board_date}>날짜</div>
        </div>
      </div>
      {loading ? (
        <div className="Loading">
          <Loading />
        </div>
      ) : (
        board.map((data: BoardType, index: number) => (
          <div key={index} className={styles.myBoard}>
            <BoardContain data={data} />
          </div>
        ))
      )}
    </div>
  );
}
