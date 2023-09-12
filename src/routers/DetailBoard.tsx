import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import YesNo from "../components/modals/YesNo";
import { No, onClose, onOpen } from "../store/YesNo";
import Comment from "../components/Comment";
import styles from "../style/Board/DetailBoard.module.css";
export default function DetailBoard() {
  const { postNumber }: any = useParams();
  const [detail, setDetail] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<any>("");
  const navgator = useNavigate();
  //   const [date, setDate] = useState("1");
  const login_check = useSelector((state: any) => {
    return state;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const Image = async (board: any, date: any) => {
      try {
        const response: any = await axios.get(
          "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/images",
          {
            params: {
              userId: board.userId,
              date: date,
              postNumber: board.postNumber,
              image: board.image,
              file: "board",
            },
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    const fetch = async () => {
      try {
        const response: any = await axios.get(
          "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/boardDeatil",
          {
            params: {
              postNumber: postNumber,
            },
          }
        );
        if (response) {
          const date = response.data.date.split(":");
          Image(response.data, date[0]);
          //   setDate(date[0]);
          setDetail(response.data);
          setLoading(false);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);
  console.log(image);

  const Delete = async () => {
    try {
      const response = await axios.delete(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/delete",
        {
          params: { _id: detail._id, postNumber: detail.postNumber },
        }
      );
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
    <div className={styles.detail_board}>
      <YesNo />
      {loading ? (
        "...Loading"
      ) : (
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
      )}
    </div>
  );
}
