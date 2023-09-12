import Modal from "../Modal";
import { useSelector } from "react-redux";
import {
  onOpen as login_Open,
  onClose as login_Close,
  addId,
  login,
  removeId,
} from "../../store/LoginStore";
import {
  onOpen as register_Open,
  onClose as register_Close,
} from "../../store/RegisterStore";
import styles from "../../style/Modal/Modal.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginCheck } from "../../store/LoginStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

export default function LoginModal() {
  let login = useSelector((state: any) => {
    return state.login;
  });
  const navigator = useNavigate();
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const dispatch = useDispatch();

  const LoginCheck = async () => {
    try {
      const response: any = await axios.get("/api/loginCheck");
      if (response.data.login) {
        dispatch(login());
        dispatch(addId(response.data._id));
      } else {
        dispatch(removeId());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { id: id, pw: pw });
      dispatch(login_Close());
      dispatch(loginCheck());
      LoginCheck();
    } catch (error) {
      console.log(error);
    }
  };

  const title = <div className={styles.title}>로그인</div>;
  const input = (
    <div>
      <div className={styles.id}>
        <label>아이디</label>
        <input
          type="text"
          onChange={(e: any) => {
            setId(e.target.value);
          }}
        />
      </div>
      <div className={styles.pw}>
        <label>비밀번호</label>
        <input
          type="password"
          onChange={(e: any) => {
            setPw(e.target.value);
          }}
        />
      </div>
    </div>
  );
  const button = (
    <div className={styles.btn}>
      <button
        className={styles.login_btn}
        onClick={() => {
          handleLogin();
        }}
      >
        로그인
      </button>
      <button
        className={styles.register_btn}
        onClick={() => {
          dispatch(register_Open());
          dispatch(login_Close());
        }}
      >
        회원가입
      </button>
    </div>
  );

  const close = (
    <button
      className={styles.close}
      onClick={() => {
        dispatch(login_Close());
        dispatch(register_Close());
      }}
    >
      <AiFillCloseCircle />
    </button>
  );

  return (
    <Modal
      isOpen={login}
      title={title}
      input={input}
      button={button}
      close={close}
    />
  );
}
