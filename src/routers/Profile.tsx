import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import User_profile from "../components/Profile/User_profile";
import CommentBoard from "../components/Profile/CommentBoard";
import BoardLiked from "../components/Profile/BoardLiked";
import MyComment from "../components/Profile/MyComment";
import MyBoard from "../components/Profile/MyBoard";

import styles from "../style/Profile/Profile.module.css";
import { UserType } from "../types/user";

const btn_type = ["작성글", "작성 댓글", "댓글단 글", "좋아요한 글"];
const data = {
  email: "",
  id: "",
  name: "",
  pw: "",
  _id: "",
  image: "",
  totalComment: 0,
  totalBoard: 0,
};

export default function Profile() {
  const { _id } = useParams() as { _id: string };

  const [user, setUser] = useState<UserType>(data);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggole] = useState(0);

  useEffect(() => {
    const User_fetch = async () => {
      try {
        const response = await axios.get("/api/profile", {
          params: { _id: _id },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    User_fetch();
  }, []);

  return (
    <div className={styles.header}>
      <div>
        <div>
          {/* 유저 정보 */}
          {loading ? null : <User_profile user={user} />}

          <div className={styles.toggle}>
            <ul>
              {btn_type.map((data: string, index: number) => (
                <li
                  onClick={() => {
                    setToggole(index);
                  }}
                  style={
                    toggle === index
                      ? { background: "#4db9ff", color: "white" }
                      : { background: "none" }
                  }
                >
                  {data}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {toggle === 0 ? (
          // 작성글 컴포넌트로 수정
          <MyBoard _id={_id} />
        ) : toggle === 1 ? (
          <MyComment _id={_id} />
        ) : toggle === 2 ? (
          <CommentBoard _id={_id} />
        ) : toggle === 3 ? (
          <BoardLiked _id={_id} />
        ) : null}
      </div>
    </div>
  );
}
