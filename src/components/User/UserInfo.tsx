import axios from "axios";
import styles from "../../style/User/User.module.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function UserInfo({ user }: any) {
  const [disabled, setDisabled] = useState(true);
  const [sub, setSub] = useState(false);
  const [pw, setPw] = useState(user.pw);
  const [id, setId] = useState(user.id);
  const [email, setEmail] = useState(user.email);
  const navigator = useNavigate();
  const [image, setImage] = useState<string>("");

  const imageInput = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("파일찾기");
  const [deleteImg, setDeleteImg] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const Image = async (board: any) => {
      try {
        const response = await axios.get("/api/images", {
          params: {
            id: board.id,
            image: board.image,
            file: "user",
          },
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.image === "default.jpg") {
      setImage("/img/blank-profile-picture-ge4ff853e7_1280.png");
      setLoading(false);
    } else {
      Image(user);
    }
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        body: new FormData(event.currentTarget), // 폼 데이터를 직접 전송
      });
      if (response.ok) {
        navigator("/");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  return (
    <div className={styles.user_info}>
      {loading ? null : (
        <>
          <p>자기정보</p>
          <form
            method="POST"
            action="/api/user/update"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className={styles.user_info_inner}>
              <input
                type="text"
                value={user.name}
                name="name"
                disabled={disabled}
                style={
                  disabled
                    ? { borderBottom: "2px solid #4db9ff" }
                    : { border: "2px solid #4db9ff" }
                }
              />
              <input
                type="text"
                value={id}
                name="id"
                disabled={disabled}
                onChange={(e: any) => {
                  setId(e.target.value);
                }}
                style={
                  disabled
                    ? { borderBottom: "2px solid #4db9ff" }
                    : { border: "2px solid #4db9ff" }
                }
              />
              <input
                type="text"
                value={pw}
                name="pw"
                disabled={disabled}
                onChange={(e: any) => {
                  setPw(e.target.value);
                }}
                style={
                  disabled
                    ? { borderBottom: "2px solid #4db9ff" }
                    : { border: "2px solid #4db9ff" }
                }
              />
              <input
                type="text"
                value={email}
                name="email"
                disabled={disabled}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                style={
                  disabled
                    ? { borderBottom: "2px solid #4db9ff" }
                    : { border: "2px solid #4db9ff" }
                }
              />
              <div
                className={styles.image_pick}
                style={
                  disabled
                    ? { borderBottom: "2px solid #4db9ff" }
                    : { border: "2px solid #4db9ff" }
                }
              >
                {image ? (
                  <div
                    className={styles.image}
                    onClick={() => {
                      if (imageInput.current) {
                        imageInput.current.click();
                      }
                    }}
                  >
                    <img src={image} alt={image} />
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
                    <img
                      src={"/img/blank-profile-picture-ge4ff853e7_1280.png"}
                      alt={"기본이미지"}
                    />
                  </div>
                )}
              </div>
              {/* 첨부 파일 */}
              {disabled ? null : (
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
                      if (imageInput.current && !disabled) {
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
                          setImage(
                            "/img/blank-profile-picture-ge4ff853e7_1280.png"
                          );
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
              )}

              {disabled ? (
                <button
                  className={styles.user_info_btn}
                  onClick={() => {
                    setDisabled(false);
                  }}
                >
                  자기정보 변경
                </button>
              ) : null}

              {disabled ? null : (
                <>
                  <button
                    type="submit"
                    className={styles.user_info_btn}
                    style={{ background: "#50f2f5" }}
                  >
                    변경
                  </button>
                  <button
                    className={styles.user_info_btn}
                    style={{ zIndex: "100" }}
                    onClick={() => {
                      setDisabled(true);
                    }}
                  >
                    취소
                  </button>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
