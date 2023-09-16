import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImageAlt } from "react-icons/bs";
import styles from "../../style/Board/Update/BoardContain.module.css";
import axios from "axios";
import { BoardType } from "../../types/board";

export default function BoardContain({ data }: { data: BoardType }) {
  const [commentLength, setCommentLength] = useState(0);
  useEffect(() => {
    console.log(data._id);
    const commentLength = async () => {
      try {
        const respnse = await axios.get("/api/comment/length", {
          params: { board_id: data._id },
        });
        console.log("갯수" + respnse.data);
        setCommentLength(respnse.data);
      } catch (error) {
        console.log(error);
      }
    };
    commentLength();
  }, []);

  return (
    <div className={styles.board}>
      <Link to={`/detail/${data.postNumber}`} className={styles.border_link}>
        <div className={styles.board_number}>{data.postNumber}</div>
        <div className={styles.board_title}>
          {data.title.length > 30 ? (
            <div className={styles.board_title_inner}>
              {`${data.title.slice(0, 29)}...`}
              {commentLength > 0 ? (
                <div
                  className={styles.board_comment_length}
                >{`[${commentLength}]`}</div>
              ) : null}
            </div>
          ) : (
            <div className={styles.board_title_inner}>
              {data.title}
              {commentLength > 0 ? (
                <div
                  className={styles.board_comment_length}
                >{`[${commentLength}]`}</div>
              ) : null}
            </div>
          )}
          {data.image && data.image !== "default.jpg" ? (
            <span className={styles.image_pic}>
              <BsImageAlt size={20} color="#9E9E9E" />
            </span>
          ) : null}
        </div>
      </Link>
      <div className={styles.board_author}>
        {data.author.length > 5 ? `${data.author.slice(0, 4)}...` : data.author}
      </div>
      <div className={styles.board_date}>{data.date.split(":")[0]}</div>
    </div>
  );
}
