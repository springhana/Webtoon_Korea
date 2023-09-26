import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BoardType } from "../../types/board";
import { commentType } from "../../types/comment";

import styles from "../../style/Board/BoardContain.module.css";
import { BsImageAlt } from "react-icons/bs";

export default function BoardContain({
  data,
}: {
  data: BoardType | commentType;
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [commentLength, setCommentLength] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const Image = async (board: any, date: string) => {
      try {
        const response = await axios.get("/api/images", {
          params: {
            userId: board.userId,
            date: date,
            postNumber: board.postNumber,
            image: board.image,
            file: "board",
          },
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const date = data.date.split(":");
    Image(data, date[0]);
  }, []);

  useEffect(() => {
    // 채팅 갯수 가져오기
    const commentLength = async () => {
      try {
        const respnse = await axios.get("/api/comment/length", {
          params: { board_id: data._id },
        });
        setCommentLength(respnse.data);
      } catch (error) {
        console.log(error);
      }
    };
    commentLength();
  }, []);

  return (
    <div className={styles.board}>
      <div className={styles.inner}>
        <Link to={`/detail/${data.postNumber}`} className={styles.border_link}>
          <div className={styles.board_number}>{data.postNumber}</div>
          <div className={styles.board_title}>
            {data.title && data.title.length > 30 ? (
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
              windowWidth > 1024 ? (
                <span className={styles.image_pic}>
                  <BsImageAlt size={20} color="#9E9E9E" />
                </span>
              ) : null
            ) : null}
          </div>
        </Link>
        <div className={styles.board_author}>
          <Link to={`/profile/${data.userId}`}>
            {data.author.length > 5
              ? `${data.author.slice(0, 4)}...`
              : data.author}
          </Link>
        </div>
        <div className={styles.board_date}>{data.date.split(":")[0]}</div>
      </div>

      <div className={styles.image_pic_mobile_pic}>
        {data.image && data.image !== "default.jpg" ? (
          windowWidth > 1024 ? null : (
            <span className={styles.image_pic_mobile}>
              {loading ? null : <img src={image} alt={image} />}
            </span>
          )
        ) : null}
      </div>
    </div>
  );
}
