import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";

import {
  onOpen as login_Open,
  onClose as login_Close,
} from "../../store/LoginStore";
import { onClose as register_Close } from "../../store/RegisterStore";

import { ReduxType } from "../../types/redux";

import styles from "../../style/Modal/Modal.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";

export default function RegisterModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageInput = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("파일찾기");
  const [image, setImage] = useState<string>("");
  const [deleteImg, setDeleteImg] = useState(0);

  let register = useSelector((state: ReduxType) => {
    return state.register;
  });

  // 이미지 업로드 핸들러
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

  // onSubmit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: new FormData(event.currentTarget), // 폼 데이터를 직접 전송
      });
      if (response.ok) {
        navigate(0);
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
          <input type="text" name="id" />
        </div>
        <div className={styles.pw}>
          <label>비밀번호</label>
          <input type="password" name="pw" />
        </div>
        <div className={styles.name}>
          <label>이름</label>
          <input type="text" name="name" />
        </div>
        <div className={styles.email}>
          <label>이메일</label>
          <input type="email" name="email" />
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
