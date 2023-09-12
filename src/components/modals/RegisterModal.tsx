import React, { useState } from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  onOpen as login_Open,
  onClose as login_Close,
} from "../../store/LoginStore";
import {
  onOpen as register_Open,
  onClose as register_Close,
} from "../../store/RegisterStore";
import styles from "../../style/Modal/Modal.module.css";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
export default function RegisterModal() {
  let register = useSelector((state: any) => {
    return state.register;
  });
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [pw, setPw] = useState();
  const [email, setEmail] = useState();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/register",
        {
          id: id,
          pw: pw,
          name: name,
          email: email,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const title = <div className={styles.title}> 회원가입</div>;
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
      <div className={styles.name}>
        <label>이름</label>
        <input
          type="text"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.email}>
        <label>이메일</label>
        <input
          type="email"
          onChange={(e: any) => {
            setEmail(e.target.value);
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
          handleRegister();
          dispatch(register_Close());
          dispatch(login_Open());
        }}
      >
        회원가입 하기
      </button>
      <button
        className={styles.register_btn}
        onClick={() => {
          dispatch(register_Close());
          dispatch(login_Open());
        }}
      >
        뒤로가기
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
      isOpen={register}
      title={title}
      input={input}
      button={button}
      close={close}
    />
  );
}
