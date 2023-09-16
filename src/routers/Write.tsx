import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../style/Board/Write.module.css";
import { BsCardImage } from "react-icons/bs";
import { ReduxType } from "../types/redux";
export default function Write() {
  const [image, setImage] = useState<string>("");
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("파일찾기");
  const [deleteImg, setDeleteImg] = useState(0);

  const loginCheck = useSelector((state: ReduxType) => {
    return state.loginCheck;
  });

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

  if (!loginCheck.login) {
    return <div>로그인해주세요.</div>;
  }
  return (
    <div className={styles.write}>
      <form method="POST" action="/api/write" encType="multipart/form-data">
        <div className={styles.write_title}>
          <h3>제목</h3>
          <input type="text" name="title" />
        </div>

        <div className={styles.write_content}>
          <h3>내용</h3>
          <input type="text" name="content" />
          {/* 폴더에 각각의 게시판 폴더 - 유저 아이디 폴더 - 사진 */}
          {image ? (
            <img src={image} alt="" className={styles.image} />
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
        </div>

        {/* 첨부 파일 */}
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

        <div className={styles.write_btn_outter}>
          <button type="submit" className={styles.write_btn}>
            전송
          </button>
        </div>
      </form>
    </div>
  );
}
