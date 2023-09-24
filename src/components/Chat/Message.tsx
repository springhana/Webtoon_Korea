import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import styles from "../../style/Chat/Message.module.css";
import ChatRoom from "./ChatRoom";
import { useSelector } from "react-redux";
import { ReduxType } from "../../types/redux";
export default function Message({ chatRoomId, init, Notification }: any) {
  let socket = io(
    `https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/`
  );
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const [userId, setUserId] = useState([]);
  const login = useSelector((state: ReduxType) => {
    return state;
  });

  useEffect(() => {
    // 서버로부터 메시지를 받을 때
    socket.on("message", (message: any, date: any, id: any, ids: any) => {
      const data = {
        content: message,
        date: date,
        userObjectId: id,
      };
      setMessages(data);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  useEffect(() => {
    if (init) {
      setMessages([]);
    }
  }, [init]);

  const sendMessage = (id: any, ids: any) => {
    try {
      if (newMessage.trim() !== "") {
        socket.emit("message", newMessage, id, ids);
        setNewMessage("");
      }

      if (chatRoomId !== "") {
        MessagePost();
      } else {
        alert("채팅방 선택");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MessagePost = async () => {
    try {
      const response = await axios.post("/api/message", {
        chatroom: chatRoomId,
        content: newMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Enter 키를 눌렀을 때 실행될 함수
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      const id = userId.find((item) => item === login.loginCheck._id);
      const ids = userId;
      sendMessage(id, ids);
      // Notification(id);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/chatroomFind", {
          params: { _id: chatRoomId },
        });
        setUserId(response.data.member);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  console.log(messages);
  return (
    <div style={{ height: "100%" }}>
      <ChatRoom chatRoomId={chatRoomId} message_socket={messages} />
      <div className={styles.submit}>
        <input
          type="text"
          value={newMessage}
          placeholder="Enter"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}
