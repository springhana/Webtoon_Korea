import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../style/Board/UpdateBoard.module.css";
import { BsCardImage } from "react-icons/bs";
export default function UpdateBoard() {
  const { postNumber }: any = useParams();
  const [board, setBoard] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<any>("");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const imageInput: any = useRef();
  const [imageName, setImageName] = useState("파일찾기");

  const Image = async (board: any, date: any) => {
    try {
      const response: any = await axios.get("/api/images", {
        params: {
          userId: board.userId,
          date: date,
          postNumber: board.postNumber,
          image: board.image,
          file: "board",
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
        const response = await axios.get("/api/boardDeatil", {
          params: { postNumber: postNumber },
        });
        const date = response.data.date.split(":");
        Image(response.data, date[0]);
        setTitle(response.data.title);
        setContent(response.data.content);
        setBoard(response.data);
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

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      {loading ? null : (
        <div className={styles.update}>
          {/* 수정 input */}
          <form
            method="POST"
            action="/api/edit?_method=PUT"
            encType="multipart/form-data"
          >
            <input value={board._id} type="hidden" name="_id" />
            <input value={board.postNumber} type="hidden" name="totalPost" />

            <div className={styles.update_title}>
              <input
                type="text"
                name="title"
                placeholder={board.title}
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
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
                onChange={(e: any) => setContent(e.target.value)}
              />
              {/* 폴더에 각각의 게시판 폴더 - 유저 아이디 폴더 - 사진 */}

              {image ? (
                <img src={`${image}`} alt={image} className={styles.image} />
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
      )}
    </div>
  );
}
