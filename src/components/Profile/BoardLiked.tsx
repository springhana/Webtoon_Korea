import axios from "axios";
import { useEffect, useState } from "react";

import BoardContain from "../Board/BoardContain";
import Loading from "../Loading";

import { BoardType } from "../../types/board";

import styles from "../../style/Profile/BoardLiked.module.css";
import { AiTwotoneHeart } from "react-icons/ai";

export default function BoardLiked({ _id }: { _id: string }) {
  const [board, setBoard] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/board/liked", {
          params: {
            _id: _id,
          },
        });
        setBoard(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div>
        <div>
          <div className={styles.board_inner}>
            <div className={styles.board_contents}>
              <div className={styles.board_number}>
                <AiTwotoneHeart color="red" />
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
              <div key={index}>
                <BoardContain data={data} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
