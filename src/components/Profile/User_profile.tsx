import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onOpen as ImageOpen, onUrl } from "../../store/ImageStore";
import { onOpen as LoginOpen } from "../../store/LoginStore";

import { ReduxType } from "../../types/redux";

import styles from "../../style/Profile/User_profile.module.css";

import { BsFillChatDotsFill } from "react-icons/bs";
import { FaChalkboard } from "react-icons/fa";
import { UserType } from "../../types/user";

export default function User_profile({ user }: { user: UserType }) {
  const dispatch = useDispatch();

  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const login = useSelector((state: ReduxType) => {
    return state;
  });

  useEffect(() => {
    const Image = async (user: any) => {
      try {
        const response = await axios.get("/api/images", {
          params: {
            id: user.id,
            image: user.image,
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
          <div
            className={styles.user_img}
            onClick={() => {
              dispatch(onUrl(image));
              dispatch(ImageOpen());
            }}
          >
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
            if (login.loginCheck.login) {
              ChatroomFetch(user._id);
            } else {
              dispatch(LoginOpen());
            }
          }}
        >
          채팅하기
        </button>
      )}
    </div>
  );
}
