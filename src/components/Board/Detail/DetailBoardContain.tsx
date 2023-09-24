import { useDispatch, useSelector } from "react-redux";
import styles from "../../../style/Board/DetailBoard.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { No, onClose, onOpen } from "../../../store/YesNo";
import { onOpen as loginOpen } from "../../../store/LoginStore";
import Comment from "../../../components/Comment";
import { BoardType } from "../../../types/board";
import { ReduxType } from "../../../types/redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
export default function DetailBoardContain({
  postNumber,
  detail,
  image,
  like,
}: {
  postNumber: string;
  detail: BoardType;
  image: string;
  like: (_id: string) => void;
}) {
  const login = useSelector((state: ReduxType) => {
    return state;
  });
  const navgator = useNavigate();
  const dispatch = useDispatch();
  const login_check = useSelector((state: ReduxType) => {
    return state;
  });
  const [totalComment, setTotalComment] = useState(0);
  const [userImage, setUserImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const commentLength = async () => {
      try {
        const response = await axios.get("/api/comment/length", {
          params: { board_id: detail._id },
        });
        setTotalComment(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    commentLength();
  }, []);
  useEffect(() => {
    const Image = async (board: any) => {
      try {
        const response = await axios.get("/api/images", {
          params: {
            id: board.id,
            image: board.image,
            file: "user",
          },
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setUserImage(imageUrl);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const User_fetch = async () => {
      try {
        const response = await axios.get("/api/profile", {
          params: { _id: detail.userId },
        });
        if (response.data.image === "default.jpg") {
          setUserImage("/img/blank-profile-picture-ge4ff853e7_1280.png");
          setLoading(false);
        } else {
          Image(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    User_fetch();
  }, []);

  const Delete = async () => {
    try {
      const response = await axios.delete("/api/delete", {
        params: { _id: detail._id, postNumber: detail.postNumber },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (login_check.yesNo.yes) {
    Delete();
    navgator(-1);
    dispatch(No());
    dispatch(onClose());
  }

  return (
    <div className={styles.detail_board_outter}>
      <div className={styles.detail_btn}>
        {/* 글 쓴 회원이면 삭제, 수정 */}
        {login_check.loginCheck._id === detail.userId ? (
          <div>
            <button
              className={styles.board_btn}
              onClick={() => {
                dispatch(onOpen());
              }}
            >
              삭제
            </button>
            <button
              className={styles.board_btn}
              onClick={() => {
                navgator(`/update/${detail.postNumber}`);
              }}
            >
              수정
            </button>
          </div>
        ) : null}
        {/* 목록 */}
        <button
          className={styles.board_btn}
          onClick={() => {
            navgator("/board/1");
          }}
        >
          목록
        </button>
      </div>
      <div className={styles.detail_board_inner}>
        <div>
          <div className={styles.detail_user}>
            <div className={styles.user_title}>{detail.title}</div>
            <div className={styles.user}>
              {loading ? null : (
                <div className={styles.userImage_pic}>
                  <img
                    src={userImage}
                    alt={userImage}
                    className={styles.userImage}
                  />
                </div>
              )}
              <div className={styles.user_author}>
                <Link to={`/profile/${detail.userId}`}>{detail.author}</Link>
              </div>
            </div>
            <div className={styles.user_date}>{detail.date}</div>
            <div className={styles.user_length}>
              {/* 좋아요 */}
              <div
                onClick={() => {
                  if (login.loginCheck.login) {
                    like(detail._id);
                  } else {
                    dispatch(loginOpen());
                  }
                }}
                className={styles.webtoon_comment_like}
              >
                {detail.likedIds &&
                detail.likedIds.includes(login.loginCheck._id) ? (
                  <div className={styles.webtoon_comment_like_inner}>
                    <AiFillHeart color="red" />
                    <span className={styles.webtoon_comment_like_length}>
                      {detail.likedIds.length}
                    </span>
                  </div>
                ) : (
                  <div className={styles.webtoon_comment_like_inner}>
                    <AiOutlineHeart />
                    <span className={styles.webtoon_comment_like_length}>
                      {detail.likedIds.length}
                    </span>
                  </div>
                )}
              </div>
              {/* 게시글 총 댓글 */}
              <div className={styles.webtoon_comment_like_inner}>
                <BsFillChatDotsFill />
                <span>{totalComment && totalComment}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detail_content}>
          <div className={styles.user_content}>{detail.content}</div>
          <img src={`${image}`} alt={image} style={{ width: "100%" }} />
        </div>
      </div>
      {/* 댓글 */}
      <Comment postNumber={postNumber} _id={detail._id} title={detail.title} />
    </div>
  );
}
