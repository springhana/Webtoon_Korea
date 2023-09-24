import React, { useState, useRef } from "react";
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
import { ReduxType } from "../../types/redux";
import { BsCardImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function RegisterModal() {
  let register = useSelector((state: ReduxType) => {
    return state.register;
  });
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [pw, setPw] = useState();
  const [email, setEmail] = useState();

  const imageInput = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("파일찾기");
  const [image, setImage] = useState<string>("");
  const [deleteImg, setDeleteImg] = useState(0);
  const navigator = useNavigate();
  // const handleRegister = async () => {
  //   try {
  //     const response = await axios.post("/api/register", {
  //       id: id,
  //       pw: pw,
  //       name: name,
  //       email: email,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: new FormData(event.currentTarget), // 폼 데이터를 직접 전송
      });
      if (response.ok) {
        navigator(0);
        // dispatch(register_Close());
        // dispatch(login_Open());
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  const title = <div className={styles.title}> 회원가입</div>;
  const form = (
    <div>
      <form
        method="POST"
        action="/api/write"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className={styles.id}>
          <label>아이디</label>
          <input
            type="text"
            name="id"
            onChange={(e: any) => {
              setId(e.target.value);
            }}
          />
        </div>
        <div className={styles.pw}>
          <label>비밀번호</label>
          <input
            type="password"
            name="pw"
            onChange={(e: any) => {
              setPw(e.target.value);
            }}
          />
        </div>
        <div className={styles.name}>
          <label>이름</label>
          <input
            type="text"
            name="name"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.email}>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {image ? (
          <div className={styles.image_pick}>
            <img src={image} alt="" className={styles.images} />
          </div>
        ) : (
          <div
            className={styles.image}
            onClick={() => {
              if (imageInput.current) {
                imageInput.current.click();
              }
            }}
          >
            <BsCardImage />
          </div>
        )}
        <div className={styles.filebox}>
          <input
            className={styles.upload_name}
            placeholder={imageName}
            disabled
          />
          <label
            htmlFor="file"
            onClick={() => {
              setDeleteImg((prev) => (prev = 0));
              if (imageInput.current) {
                imageInput.current.click();
              }
            }}
          >
            파일찾기
          </label>
          {image ? (
            <>
              <label
                htmlFor="file"
                onClick={() => {
                  setImageName("");
                  setImage("");
                  setDeleteImg((prev) => (prev = 1));
                }}
              >
                사진 삭제
              </label>
              <input type="hidden" name="deleteImg" value={deleteImg} />
            </>
          ) : null}
          <div className={styles.write_btn_outter}>
            <input
              ref={imageInput}
              type="file"
              name="profile"
              className={styles.file}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <button type="submit" className={styles.login_btn}>
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
      </form>
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

  return <Modal isOpen={register} title={title} close={close} form={form} />;
}
