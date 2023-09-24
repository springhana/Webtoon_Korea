import { useEffect, useState } from "react";
import styles from "../../style/Profile/User_profile.module.css";
import { useSelector } from "react-redux";
import { ReduxType } from "../../types/redux";
import axios from "axios";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaChalkboard } from "react-icons/fa";
export default function User_profile({ user }: any) {
  const login = useSelector((state: ReduxType) => {
    return state;
  });
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
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
        setImage(imageUrl);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.image === "default.jpg") {
      setImage("/img/blank-profile-picture-ge4ff853e7_1280.png");
      setLoading(false);
    } else {
      Image(user);
    }
  }, []);

  const ChatroomFetch = async (userId: string) => {
    try {
      const response = await axios.post("/api/chatroom", {
        chatuserId: userId,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.user_info}>
      <div className={styles.user_info_inner}>
        <div className={styles.user}>
          <div className={styles.user_img}>
            {loading ? null : <img src={image} alt={image} />}
          </div>
          <div>
            {user.name} <span>({user.id.padEnd(8, "*")})</span>
          </div>
        </div>

        <div className={styles.total}>
          <span>
            작성 글 :&nbsp; <FaChalkboard color="green" />
            &nbsp;
            {user.totalBoard}
          </span>
          <span>
            작성 댓글 :&nbsp;
            <BsFillChatDotsFill color="blue" />
            &nbsp;
            {user.totalComment}
          </span>
        </div>
      </div>

      {login.loginCheck._id === user._id ? null : (
        <button
          onClick={() => {
            ChatroomFetch(user._id);
          }}
        >
          채팅하기
        </button>
      )}
    </div>
  );
}
