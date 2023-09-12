import axios from "axios";
import styles from "../../style/User/User.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function UserInfo({ user }: any) {
  const [disabled, setDisabled] = useState(true);
  const [sub, setSub] = useState(false);
  const [name, setName] = useState(user.name);
  const [pw, setPw] = useState(user.pw);
  const [id, setId] = useState(user.id);
  const [email, setEmail] = useState(user.email);
  const navigator = useNavigate();
  const Login_info = async () => {
    try {
      const response = await axios.put(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/user/update",
        {
          id: id,
          pw: pw,
          name: name,
          email: email,
        }
      );
      if (response.data.edit) {
        navigator("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.user_info}>
      <p>자기정보</p>
      <div className={styles.user_info_inner}>
        <input
          type="text"
          value={name}
          name="name"
          disabled={disabled}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          style={
            disabled
              ? { borderBottom: "2px solid #4db9ff" }
              : { border: "2px solid #4db9ff" }
          }
        />
        <input
          type="text"
          value={id}
          name="id"
          disabled={disabled}
          onChange={(e: any) => {
            setId(e.target.value);
          }}
          style={
            disabled
              ? { borderBottom: "2px solid #4db9ff" }
              : { border: "2px solid #4db9ff" }
          }
        />
        <input
          type="text"
          value={pw}
          name="pw"
          disabled={disabled}
          onChange={(e: any) => {
            setPw(e.target.value);
          }}
          style={
            disabled
              ? { borderBottom: "2px solid #4db9ff" }
              : { border: "2px solid #4db9ff" }
          }
        />
        <input
          type="text"
          value={email}
          name="email"
          disabled={disabled}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
          style={
            disabled
              ? { borderBottom: "2px solid #4db9ff" }
              : { border: "2px solid #4db9ff" }
          }
        />
        {disabled ? (
          <button
            className={styles.user_info_btn}
            onClick={() => {
              setDisabled(false);
            }}
          >
            자기정보 변경
          </button>
        ) : null}

        {disabled ? null : (
          <button
            onClick={Login_info}
            className={styles.user_info_btn}
            style={{ background: "#50f2f5" }}
          >
            변경
          </button>
        )}
        <button
          className={styles.user_info_btn}
          onClick={() => {
            setDisabled(true);
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}
