import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ChatRoom from "./ChatRoom";

import { ReduxType } from "../../types/redux";
import io from "socket.io-client";

import styles from "../../style/Chat/Message.module.css";

export default function Message({
  chatRoomId,
  init,
}: {
  chatRoomId: string;
  init: boolean;
}) {
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

  // 소켓으로 채팅 보내기
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

  // 소켓으로 보내는 동시에 DB저장
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
