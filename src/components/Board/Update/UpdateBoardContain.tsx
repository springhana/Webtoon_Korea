import { useEffect, useState, useRef } from "react";
import styles from "../../../style/Board/UpdateBoard.module.css";
import { BsCardImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BoardType } from "../../../types/board";
export default function UpdateBoardContain({
  board,
  image,
}: {
  board: BoardType;
  image: string;
}) {
  const [title, setTitle] = useState(board.title);
  const [content, setContent] = useState(board.content);
  const [imageUrl, setImageUrl] = useState(image);
  const imageInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [imageName, setImageName] = useState("파일찾기");
  const [deleteImg, setDeleteImg] = useState(0);
  console.log(imageUrl);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setImageUrl(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.update}>
      {/* 수정 input */}
      <form
        method="POST"
        action="/api/edit?_method=PUT"
        encType="multipart/form-data"
      >
        <input value={board._id} type="hidden" name="_id" />
        <input value={board.postNumber} type="hidden" name="postNumber" />

        <div className={styles.update_title}>
          <input
            type="text"
            name="title"
            placeholder={board.title}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <div className={styles.user_author}>{board.author}</div>
          <div className={styles.user_date}>{board.date}</div>
        </div>

        <div className={styles.update_content}>
          <input
            type="text"
            name="content"
            placeholder={board.content}
            value={content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
          />
          {/* 폴더에 각각의 게시판 폴더 - 유저 아이디 폴더 - 사진 */}

          {imageUrl ? (
            <img src={imageUrl} alt={imageUrl} className={styles.image} />
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
          {imageUrl ? (
            <>
              <label
                htmlFor="file"
                onClick={() => {
                  setImageName("");
                  setImageUrl("");
                  setDeleteImg((prev) => (prev = 1));
                }}
              >
                사진 삭제
              </label>
              <input type="hidden" name="deleteImg" value={deleteImg} />
            </>
          ) : null}
          <input
            ref={imageInput}
            type="file"
            name="profile"
            className={styles.file}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.update_btn_outter}>
          <button type="submit" className={styles.update_btn}>
            전송
          </button>
          {/* 취소 버튼 */}
          <button
            className={styles.update_btn}
            onClick={() => {
              navigate("/board/1"); // 뒤로 가기
            }}
          >
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
}
