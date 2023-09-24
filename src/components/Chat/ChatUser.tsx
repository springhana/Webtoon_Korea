import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../style/Chat/ChatUser.module.css";
import { useSelector } from "react-redux";
import { ReduxType } from "../../types/redux";
import io from "socket.io-client";
import { MdNotificationsActive } from "react-icons/md";
export default function ChatUser({ data, userIndex, index, no }: any) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  const [notification, setNotification] = useState<any>([]);
  const login = useSelector((state: ReduxType) => {
    return state;
  });
  //   const [userId, setUserId] = useState("");
  //   useEffect(() => {
  //     const fetch = async () => {
  //       try {
  //         const response = await axios.get("/api/notificationGet", {
  //           params: { userId: login.loginCheck._id },
  //         });
  //         setUserId(response.data.userId);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetch();
  //   }, []);

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
      } catch (error) {
        console.log(error);
      }
    };
    User_fetch();
  }, []);
  useEffect(() => {
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
      const dd = ids.sort();
      setNotification(dd);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);
  console.log(notification);
  console.log(data.member);
  return (
    <>
      {loading ? null : (
        <>
          <ul className={styles.user}>
            <li>
              <div className={styles.img_pic}>
                <img src={image} alt="image" />
              </div>
            </li>
            <div className={styles.chating}>
              <li>{data.title[userIndex[index]]}님</li>
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
