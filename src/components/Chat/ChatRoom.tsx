import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";

import { useSelector } from "react-redux";
import { ReduxType } from "../../types/redux";

import styles from "../../style/Chat/ChatRoom.module.css";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { chatType } from "../../types/chat";

export default function ChatRoom({
  chatRoomId,
  message_socket,
}: {
  chatRoomId: string;
  message_socket: chatType[];
}) {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const endRed: React.RefObject<HTMLDivElement> =
    useRef() as React.RefObject<HTMLDivElement>;
  const startRef: React.RefObject<HTMLDivElement> =
    useRef() as React.RefObject<HTMLDivElement>;
  const messageRef: React.RefObject<HTMLUListElement> =
    useRef() as React.RefObject<HTMLUListElement>;

  const login = useSelector((state: ReduxType) => {
    return state;
  });

  useEffect(() => {
    // 기존의 메시지 가져오기
    const MessagesGet = async () => {
      try {
        const response = await axios.get("/api/messages", {
          params: { chatRoomId: chatRoomId },
        });
        setMessages([...response.data]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    MessagesGet();
  }, [chatRoomId]);

  useEffect(() => {
    // 기존의 메시지에 소켓으로 보낸 채팅 담기
    setMessages([...messages, message_socket]);
    if (endRed.current) {
      endRed.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message_socket]);

  const observer: any = useRef();
  const [toggle, setToggle] = useState(true);
  const lastElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect(); // 관찰자의 현재점 끊기
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setToggle(false);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [toggle]
  );
  const observer2: any = useRef();
  const middleElementRef = useCallback(
    (node: any) => {
      if (observer2.current) observer2.current.disconnect(); // 관찰자의 현재점 끊기
      observer2.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setToggle(true);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer2.current.observe(node);
    },
    [toggle]
  );

  return (
    <>
      {loading ? null : (
        <ul className={styles.message} ref={messageRef}>
          <div ref={startRef}></div>
          <button
            className={styles.upDown}
            onClick={() => {
              if (endRed.current && toggle) {
                endRed.current.scrollIntoView({
                  behavior: "smooth",
                });
              } else if (startRef.current) {
                startRef.current.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
          >
            <div className={styles}>
              {toggle ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
            </div>
          </button>
          {messages.map((data: any, index: number) => {
            if (index === 1) {
              return (
                <li
                  key={index}
                  className={styles.msg}
                  ref={middleElementRef}
                  style={
                    data.userObjectId === login.loginCheck._id
                      ? { textAlign: "right" }
                      : { textAlign: "left" }
                  }
                >
                  <div className={styles.content}>
                    <span>{data.content}</span>
                    <p>{data.date.split("T")[0]}</p>
                  </div>
                </li>
              );
            } else {
              return (
                <li
                  key={index}
                  className={styles.msg}
                  style={
                    data.userObjectId === login.loginCheck._id
                      ? { textAlign: "right" }
                      : { textAlign: "left" }
                  }
                >
                  <div className={styles.content}>
                    <span>{data.content}</span>
                    <p>{data.date.split("T")[0]}</p>
                  </div>
                </li>
              );
            }
          })}
          <div className={styles.end} ref={endRed}>
            마지막 글입니다
          </div>
          <div ref={lastElementRef}></div>
        </ul>
      )}
    </>
  );
}
