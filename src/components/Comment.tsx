import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import styles from "../style/Board/Comment.module.css";

export default function Comment({ postNumber, _id }: any) {
  const [value, setValue] = useState("");
  const [comment, setComment] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [yesNo, setYesNo] = useState(false);
  const [commentId, setCommentId] = useState("");
  const navgator = useNavigate();
  const imageInput: any = useRef();
  const login_check = useSelector((state: any) => {
    return state;
  });
  const [image, setImage] = useState<any>("");
  const [imageFile, setImageFile] = useState<any>([]);

  const [chaneg, setChaneg] = useState(0);
  // 수정을 위한 state
  const [id, setId] = useState("");
  const [imageName, setImageName] = useState("파일찾기");

  const Image = async (board: any, date: any, max: any, index: number) => {
    try {
      const response: any = await axios.get(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/images",
        {
          params: {
            userId: board.userId,
            date: date,
            postNumber: board.postNumber,
            image: board.image,
            file: "comment",
            totalComment: board.totalComment,
          },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImageFile((prevImageFile: any) => [...prevImageFile, imageUrl]);
    } catch (error) {
      console.log(error);
    } finally {
      // if (index === max - 1) {
      //   setLoading(true);
      // }
    }
  };

  const GetComment = async () => {
    try {
      const response = await axios.get(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/comment",
        {
          params: { boardId: _id },
        }
      );
      if (response) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].image !== "default.jpg") {
            const date = response.data[i].date.split(":");
            // 비동기로 해야 else로 순서대로 들어감
            await Image(response.data[i], date[0], response.data.length, i);
          } else {
            setImageFile((prevImageFile: any) => [...prevImageFile, ""]);
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

  const PostComment = async () => {
    try {
      const response = await axios.post(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/commentPost",
        {
          boardId: _id,
          comment: value,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeComment = async (id: any) => {
    try {
      const response = await axios.delete(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/commentDelete",
        {
          params: { _id: id },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      GetComment();
    }
  };

  const like = async (_id: any) => {
    try {
      const response = await axios.put(
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app/like",
        {
          _id: _id,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      GetComment();
      console.log("finally");
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
          >
            <input type="hidden" name="boardId" value={_id} />
            <input type="hidden" name="postNumber" value={postNumber} />

            <div>
              <div className={styles.webtoon_comment_post}>
                <input type="text" name="comment" />
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
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.login}>
          로그인해야 댓글을 등록할 수 있습니다.
        </div>
      )}

      {/* {yesNo ? (
        <div>
          <span
            onClick={() => {
              setYesNo(false);
              removeComment(commentId);
            }}
          >
            삭제
          </span>
          <span
            onClick={() => {
              setYesNo(false);
            }}
          >
            취소
          </span>
        </div>
      ) : null} */}

      {/* 댓글 들 */}
      {loading
        ? "댓글을 달아주세요..."
        : comment.map((data: any, index: number) => (
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
                {login_check.loginCheck.login ||
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
