import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../style/Board/UpdateComment.module.css";

export default function UpdateComment() {
  const { totalComment } = useParams();
  const [image, setImage] = useState<any>("");
  const [comment, setComment] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const imageInput: any = useRef();
  const [imageName, setImageName] = useState("파일찾기");
  const Image = async (comment: any, date: any) => {
    try {
      const response: any = await axios.get("/api/images", {
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

  useEffect(() => {
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImageName(file.name);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setImage(e.target.result);
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
          <button>취소</button>
        </div>
      </form>
    </div>
  );
}
