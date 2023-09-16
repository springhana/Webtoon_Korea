import { useDispatch, useSelector } from "react-redux";
import styles from "../../../style/Board/DetailBoard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { No, onClose, onOpen } from "../../../store/YesNo";
import Comment from "../../../components/Comment";
import { BoardType } from "../../../types/board";
import { ReduxType } from "../../../types/redux";

export default function DetailBoardContain({
  postNumber,
  detail,
  image,
}: {
  postNumber: string;
  detail: BoardType;
  image: string;
}) {
  const navgator = useNavigate();
  const dispatch = useDispatch();
  const login_check = useSelector((state: ReduxType) => {
    return state;
  });
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
        <div className={styles.detail_user}>
          <div className={styles.user_title}>{detail.title}</div>
          <div className={styles.user_author}>{detail.author}</div>
          <div className={styles.user_date}>{detail.date}</div>
        </div>

        <div className={styles.detail_content}>
          <div className={styles.user_content}>{detail.content}</div>
          <img src={`${image}`} alt={image} style={{ width: "100%" }} />
        </div>
      </div>
      {/* 댓글 */}
      <Comment postNumber={postNumber} _id={detail._id} />
    </div>
  );
}
