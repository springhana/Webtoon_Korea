import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import styles from "../style/Comment.module.css";
import { ReduxType } from "../types/redux";
import { commentType } from "../types/comment";

export default function Comment({
  postNumber,
  _id,
}: {
  postNumber: string;
  _id: string;
}) {
  const [value, setValue] = useState("");
  const [comment, setComment] = useState<commentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [yesNo, setYesNo] = useState(false);
  const [commentId, setCommentId] = useState("");
  const navgator = useNavigate();
  const imageInput = useRef<HTMLInputElement>(null);
  const login_check = useSelector((state: ReduxType) => {
    return state;
  });
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<string[]>([]);

  const [chaneg, setChaneg] = useState(0);
  // 수정을 위한 state
  const [id, setId] = useState("");
  const [imageName, setImageName] = useState("파일찾기");
  const [deleteImg, setDeleteImg] = useState(0);

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
      setImageFile((prevImageFile: string[]) => [...prevImageFile, imageUrl]);
    } catch (error) {
      console.log(error);
    }
  };

  const GetComment = async () => {
    try {
      const response = await axios.get("/api/comment", {
        params: { boardId: _id },
      });
      if (response) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].image !== "default.jpg") {
            const date = response.data[i].date.split(":");
            // 비동기로 해야 else로 순서대로 들어감
            await Image(response.data[i], date[0]);
          } else {
            setImageFile((prevImageFile: string[]) => [...prevImageFile, ""]);
          }
        }
        console.log(response.data);
        setLoading(false);

        setComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetComment();
  }, [yesNo]);

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

  const removeComment = async (id: string) => {
    try {
      const response = await axios.delete("/api/commentDelete", {
        params: { _id: id },
      });
    } catch (error) {
      console.log(error);
    } finally {
      GetComment();
    }
  };

  const like = async (_id: string) => {
    try {
      const response = await axios.put("/api/like", {
        _id: _id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      GetComment();
      console.log("finally");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/commentPost", {
        method: "POST",
        body: new FormData(event.currentTarget), // 폼 데이터를 직접 전송
      });
      if (response.ok) {
        GetComment();
        setValue("");
        setImage("");
        setImageName("");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      GetComment();
    }
  };
  return (
    <div className={styles.main}>
      <h3 className={styles.logo}>Comments</h3>
      {login_check.loginCheck.login ? (
        <div>
          <form
            method="POST"
            action="/api/commentPost"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="boardId" value={_id} />
            <input type="hidden" name="postNumber" value={postNumber} />

            <div>
              <div className={styles.webtoon_comment_post}>
                <input
                  type="text"
                  name="comment"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <button type="submit" className={styles.webtoon_comment_btn}>
                  댓글 쓰기
                </button>
              </div>

              <div>
                {/* 폴더에 각각의 게시판 폴더 - 유저 아이디 폴더 - 사진 */}
                {image ? (
                  <img
                    src={image}
                    alt=""
                    style={{ width: "200px" }}
                    className={styles.file_image}
                  />
                ) : null}

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
                        setDeleteImg((prev) => (prev = 0));
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
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.login}>
          로그인해야 댓글을 등록할 수 있습니다.
        </div>
      )}

      {/* 댓글 들 */}
      {loading
        ? "댓글을 달아주세요..."
        : comment.map((data: commentType, index: number) => (
            <div key={index} className={styles.webtoon_comment_container}>
              <p className={styles.webtoon_comment_author}>
                {data.author}
                <span className={styles.webtoon_comment_date}>{data.date}</span>
              </p>
              <div className={styles.webtoon_comment_comments}>
                {data.comment}
              </div>
              {/* 좋아요 */}
              <div
                onClick={() => {
                  like(data._id);
                }}
                className={styles.webtoon_comment_like}
              >
                {data.likedIds && data.likedIds.length > 0 ? (
                  <div className={styles.webtoon_comment_like_inner}>
                    <AiFillLike />
                    <span className={styles.webtoon_comment_like_length}>
                      {data.likedIds.length}
                    </span>
                  </div>
                ) : (
                  <div className={styles.webtoon_comment_like_inner}>
                    <AiOutlineLike />
                    <span className={styles.webtoon_comment_like_length}>
                      {data.likedIds.length}
                    </span>
                  </div>
                )}
              </div>
              {imageFile[index] ? (
                <img
                  src={imageFile[index]}
                  alt="이미지"
                  style={{ width: "200px" }}
                />
              ) : null}

              <div className={styles.webtoon_comment_post_container}>
                {/* 삭제 */}
                {login_check.loginCheck.login &&
                login_check.loginCheck._id === data.userId ? (
                  id === data._id && !yesNo ? (
                    <div className={styles.webtoon_comment_post}>
                      <span
                        onClick={() => {
                          setYesNo(false);
                          removeComment(commentId);
                          setChaneg(0);
                        }}
                        className={styles.webtoon_comment_btn}
                      >
                        삭제
                      </span>
                      <span
                        onClick={() => {
                          setYesNo(true);
                          setId("");
                          setChaneg(0);
                        }}
                        className={styles.webtoon_comment_btn}
                      >
                        취소
                      </span>
                    </div>
                  ) : chaneg === 2 && _id === data._id ? null : (
                    <div className={styles.webtoon_comment_update}>
                      <button
                        onClick={() => {
                          setCommentId(data._id);
                          setId(data._id);
                          setYesNo(false);
                          setChaneg((prev) => (prev = 1));
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  )
                ) : null}

                {/*  수정 */}
                {login_check.loginCheck.login &&
                login_check.loginCheck._id === data.userId ? (
                  chaneg === 1 && id === data._id ? null : (
                    <div className={styles.webtoon_comment_update}>
                      <button
                        onClick={() => {
                          navgator(`/update_Comment/${data.totalComment}`);
                        }}
                      >
                        수정
                      </button>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          ))}
    </div>
  );
}
