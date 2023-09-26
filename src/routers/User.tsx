import axios from "axios";
import { useState } from "react";

import UserInfo from "../components/User/UserInfo";

import styles from "../style/User/User.module.css";
import { UserType } from "../types/user";

const data = {
  email: "",
  id: "",
  image: "",
  name: "",
  pw: "",
  totalBoard: 0,
  totalComment: 0,
  _id: "",
};

export default function User() {
  const [loading, setLoading] = useState(false);
  const [pw, setPw] = useState("");
  const [user, setUser] = useState<UserType>(data);

  // 내 정보
  const MyPage = async () => {
    try {
      const response = await axios.get("/api/user", { params: { pw: pw } });
      setUser(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.user}>
      {loading ? (
        <UserInfo user={user} />
      ) : (
        <div className={styles.user_inner}>
          <p>비밀번호를 입력하세요</p>
          <input
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPw(e.target.value);
            }}
          />
          <button onClick={MyPage}>클릭</button>
        </div>
      )}
    </div>
  );
}
