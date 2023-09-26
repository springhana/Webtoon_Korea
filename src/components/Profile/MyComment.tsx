import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "../Loading";

import styles from "../../style/Profile/MyComment.module.css";

import { BsFillChatDotsFill, BsFillCalendarDateFill } from "react-icons/bs";
import { FaChalkboard } from "react-icons/fa";
import { commentType } from "../../types/comment";

export default function MyComment({ _id }: { _id: string }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/myComment", {
          params: { userId: _id },
        });
        setComments(response.data);
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
        {loading ? (
          <div className="Loading">
            <Loading />
          </div>
        ) : (
          <div>
            <div className={styles.board_inner}>
              <div className={styles.board_contents}>
                <div className={styles.board_number}>
                  <BsFillChatDotsFill color="blue" />
                  &nbsp;
                  {comments.length}
                </div>
                <div className={styles.board_comment}>댓글</div>
              </div>
            </div>
            {comments.map((data: commentType) => (
              <div className={styles.comments}>
                <Link to={`/detail/${data.postNumber}`}>
                  <div>
                    <BsFillChatDotsFill color="blue" />
                    &nbsp;{data.comment}
                  </div>
                  <div>
                    <BsFillCalendarDateFill color="red" />
                    &nbsp;{data.date.split(":")[0]}
                  </div>
                  <div>
                    <FaChalkboard color="green" />
                    &nbsp;{data.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
