import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../style/Board/UpdateComment.module.css";
import { commentType } from "../types/comment";

export default function UpdateComment() {
  const { totalComment } = useParams();
  const [image, setImage] = useState<string>("");
  const data = {
    author: "",
    boardId: "",
    comment: "",
    date: "",
    image: "",
    likedIds: [],
    postNumber: 0,
    totalComment: 0,
    userId: "",
    _id: "",
  };
  const [comment, setComment] = useState<commentType>(data);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("파일찾기");

  useEffect(() => {
    const Image = async (comment: commentType, date: string) => {
      try {
        const response = await axios.get("/api/images", {
          params: {
            userId: comment.userId,
            date: date,
            postNumber: comment.postNumber,
            image: comment.image,
            file: "comment",
            totalComment: comment.totalComment,
          },
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const Update = async () => {
      try {
        const response = await axios.get("/api/commentOne", {
          params: { totalComment: totalComment },
        });
        const date = response.data.date.split(":");
        Image(response.data, date[0]);
        setComment(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    Update();
  }, []);

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

  return (
    <div className={styles.update}>
      <form
        method="POST"
        action="/api/editComment?_method=PUT"
        encType="multipart/form-data"
        className={styles.container}
      >
        <input
          type="text"
          name="comment"
          placeholder={comment.comment}
          className={styles.comment}
        />
        <input type="hidden" name="_id" value={comment._id} />
        <input type="hidden" name="totalComment" value={totalComment} />
        <input type="hidden" name="postNumber" value={comment.postNumber} />
        {/* 폴더에 각각의 게시판 폴더 - 유저 아이디 폴더 - 사진 */}
        {image ? <img src={image} alt="" className={styles.image} /> : null}
        {/* <input type="file" name="profile" onChange={handleFileChange} /> */}
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
              if (imageInput.current) {
                imageInput.current.click();
              }
            }}
          >
            파일찾기
          </label>

          <input
            ref={imageInput}
            type="file"
            name="profile"
            className={styles.file}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.webtoon_comment_update}>
          <button type="submit">전송</button>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
