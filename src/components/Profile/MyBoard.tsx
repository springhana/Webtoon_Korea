import { useEffect, useState } from "react";
import { FaChalkboard } from "react-icons/fa";
import BoardContain from "../Board/BoardContain";
import axios from "axios";
import styles from "../../style/Profile/MyBoard.module.css";
import { BoardType } from "../../types/board";
import Loading from "../Loading";
export default function MyBoard({ _id }: any) {
  const [board, setBoard] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const Board_fetch = async () => {
      // 869 서버
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
