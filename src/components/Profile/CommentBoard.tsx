import axios from "axios";
import { useEffect, useState } from "react";

import CommentBoardContainer from "./CommentBoardContainer";
import Loading from "../Loading";

import styles from "../../style/Profile/CommentBoard.module.css";
import { FaComments } from "react-icons/fa";
import { commentType } from "../../types/comment";

export default function CommentBoard({ _id }: { _id: string }) {
  const [comments, setComment] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/myComment", {
          params: { userId: _id },
        });
        const result: any = response.data.filter(
          (obj: any, index: any, self: any) =>
            index === self.findIndex((o: any) => o.boardId === obj.boardId)
        );
        setComment(result);
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
        <div className={styles.board_inner}>
          <div className={styles.board_contents}>
            <div className={styles.board_number}>
              <FaComments color="blue" />
              &nbsp;
              {comments.length}
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
          comments.map((data: commentType, index: number) => (
            <div key={index}>
              <CommentBoardContainer data={data} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
