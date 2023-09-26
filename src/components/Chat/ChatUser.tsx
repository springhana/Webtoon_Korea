import axios from "axios";
import { useEffect, useState } from "react";

import io from "socket.io-client";
import { ReduxType } from "../../types/redux";
import { useSelector } from "react-redux";

import { UserType } from "../../types/user";

import styles from "../../style/Chat/ChatUser.module.css";
import { MdNotificationsActive } from "react-icons/md";

export default function ChatUser({ data, userIndex, index }: any) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  const [notification, setNotification] = useState<any>([]);
  const [name, setName] = useState("");

  const login = useSelector((state: ReduxType) => {
    return state;
  });

  useEffect(() => {
    // 유저 이미지 가져오기, 이름
    const Image = async (user: UserType) => {
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

    const User_fetch = async () => {
      try {
        const response = await axios.get("/api/profile", {
          params: { _id: data.member[userIndex[index]] },
        });
        if (response.data.image === "default.jpg") {
          setImage("/img/blank-profile-picture-ge4ff853e7_1280.png");
          setLoading(false);
        } else {
          Image(response.data);
        }
        setName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    User_fetch();
  }, []);

  useEffect(() => {
    // 마지막 채팅 가져오기
    const MessagesGet = async (chatRoomId: string) => {
      console.log(chatRoomId);
      try {
        const response = await axios.get("/api/messages", {
          params: { chatRoomId: chatRoomId },
        });
        console.log(response.data);
        const msg = response.data[response.data.length - 1];
        setMessages(msg);
      } catch (error) {
        console.log(error);
      }
    };
    MessagesGet(data._id);
  }, []);

  let socket = io(
    `https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/`
  );
  useEffect(() => {
    // 서버로부터 메시지를 받을 때
    socket.on("message", (message: any, date: any, id: any, ids: any) => {
      const notifi = ids.sort();
      setNotification(notifi);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!login.loginCheck.login) {
    return <div>로그인 해주세요</div>;
  }

  return (
    <>
      {loading ? (
        <div className={styles.loading_img}>
          <img src="img/1490.gif" alt="img/1490.gif" />
        </div>
      ) : (
        <>
          <ul className={styles.user}>
            <li>
              <div className={styles.img_pic}>
                <img src={image} alt="image" />
              </div>
            </li>
            <div className={styles.chating}>
              <li>{name}님</li>
              <li>{messages && messages.content}</li>
            </div>
            {notification[0] === data.member.sort()[0] &&
            notification[1] === data.member.sort()[1] ? (
              <div className={styles.notification}>
                <MdNotificationsActive />
              </div>
            ) : null}
          </ul>
        </>
      )}
    </>
  );
}
