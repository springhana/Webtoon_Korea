import { useState } from "react";
import styles from "../style/User/User.module.css";
import axios from "axios";
import UserInfo from "../components/User/UserInfo";
export default function User() {
  const [loading, setLoading] = useState(false);
  const [pw, setPw] = useState("");
  const [user, setUser] = useState([]);
  const MyPage = async () => {
    try {
      const reponse = await axios.get(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/user",
        { params: { pw: pw } }
      );
      console.log(reponse);
      setUser(reponse.data);
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
            onChange={(e: any) => {
              setPw(e.target.value);
            }}
          />
          <button onClick={MyPage}>클릭</button>
        </div>
      )}
    </div>
  );
}
