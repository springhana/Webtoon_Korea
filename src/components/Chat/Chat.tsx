import axios from "axios";
import styles from "../../style/Chat/Chat.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxType } from "../../types/redux";
import Message from "./Message";
import ChatIcon from "./ChatIcon";
import StateIcon from "./StateIcon";
import ChatUser from "./ChatUser";
import { onOpen } from "../../store/LoginStore";
export default function Chat() {
  const login = useSelector((state: ReduxType) => {
    return state;
  });
  const dispatch = useDispatch();
  const [chat, setChat] = useState([]);
  const [userIndex, setUserIndex] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [chatRoomId, setChatRoomId] = useState<any>("");
  const [init, setInit] = useState(false);
  const [toggle, setToggle] = useState(0);

  // const [messages, setMessages] = useState<any>([]);

  const [iconToggle, setIconToggle] = useState(false);
  const [notification, setNotification] = useState();

  const userName = async (data: any) => {
    let findIndex: any = [];
    data.map((data: any) => {
      const findUser = data.member.find(
        (item: any) => item !== login.loginCheck._id
      );
      const index = data.member.indexOf(findUser);
      findIndex.push(index);
    });
    setUserIndex(findIndex);
    setLoading(false);
  };

  const ChatFetch = async () => {
    try {
      const response = await axios.get("/api/chat");

      if (response.data) {
        await userName(response.data);
      }
      setChat(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setChat([]);
    setInit(false);
  }, [init]);
  useEffect(() => {
    ChatFetch();
  }, [login.loginCheck._id, init]);

  const Notification = async (userId: any) => {
    try {
      const date = new Date();
      const response = await axios.post("/api/notification", {
        userId: userId,
        date: date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.nav}>
      {iconToggle ? (
        <div className={styles.header}>
          <div className={styles.inner}>
            {/* 채팅방 */}

            {toggle === 0 ? (
              <div className={styles.users}>
                {loading ? null : (
                  <>
                    <div
                      className={styles.resize}
                      onClick={() => {
                        setIconToggle(false);
                      }}
                    >
                      <StateIcon />
                    </div>
                    {chat.map((data: any, index: number) => (
                      <div
                        key={index}
                        className={styles.user}
                        onClick={async () => {
                          setChatRoomId(data._id);
                          setInit(true);
                          setToggle((prev) => (prev = 1));
                        }}
                      >
                        <ChatUser
                          data={data}
                          userIndex={userIndex}
                          index={index}
                          no={notification}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div style={{ height: "100%" }}>
                <div
                  className={styles.resize}
                  onClick={() => {
                    setToggle((prev) => (prev = 0));
                  }}
                >
                  <StateIcon />
                </div>
                <div className={styles.chatInfo}>
                  <Message
                    chatRoomId={chatRoomId}
                    init={init}
                    Notification={Notification}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            if (!login.loginCheck.login) {
              dispatch(onOpen());
            } else {
              setIconToggle(true);
            }
          }}
        >
          <ChatIcon />
        </div>
      )}
    </div>
  );
}
