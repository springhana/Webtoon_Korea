import axios from "axios";
import styles from "../../style/Nav/Nav.module.css";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";
import UserStatus from "./UserStatus";

import { UserType } from "../../types/user";
import { ReduxType } from "../../types/redux";

import { addId, onOpen as login_Open, removeId } from "../../store/LoginStore";
import { login as login_check } from "../../store/LoginStore";

const init = {
  _id: "",
  id: "",
  pw: "",
  name: "",
  email: "",
  image: "",
  totalBoard: 0,
  totalComment: 0,
};
function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(init);
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const menubar = useRef<HTMLUListElement>(null);

  let loginCheck = useSelector((state: ReduxType) => {
    return state.loginCheck;
  });

  const ToggleButton = () => {
    setToggle(false);
  };

  function NowLoaction(url: string) {
    if (url === location.pathname.split("/")[3]) {
      return styles.location;
    } else if (url === location.pathname.split("/")[2]) {
      return styles.location;
    } else if (url === location.pathname.split("/")[1]) {
      return styles.location;
    } else {
      return null;
    }
  }

  useEffect(() => {
    const Image = async (board: UserType) => {
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
    const User_fetch = async (_id: string) => {
      try {
        const response = await axios.get("/api/profile", {
          params: { _id: _id },
        });
        if (response.data.image === "default.jpg") {
          setImage("/img/blank-profile-picture-ge4ff853e7_1280.png");
          setLoading(false);
        } else {
          Image(response.data);
        }
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const LoginCheck = async () => {
      try {
        const response = await axios.get("/api/loginCheck");
        if (response.data.login) {
          await User_fetch(response.data._id);
          dispatch(login_check());
          dispatch(addId(response.data._id));
        } else {
          dispatch(removeId());
        }
      } catch (error) {
        console.log(error);
      }
    };
    LoginCheck();
  }, [loginCheck.login]);

  return (
    <div className={styles.nav}>
      <div className={styles.nav_Logo}>
        <h1>
          <Link to={"/"}>
            <Logo />
          </Link>
        </h1>

        <div className={styles.nav_login_search}>
          <SearchBar />
          {loginCheck.login ? (
            <>
              {loading ? null : (
                <div
                  className={styles.user_img_pic}
                  onClick={() => {
                    setToggle(true);
                  }}
                >
                  <img src={image} alt={image}></img>
                </div>
              )}
            </>
          ) : (
            <button
              className={styles.login_btn}
              onClick={() => {
                dispatch(login_Open());
              }}
            >
              로그인
            </button>
          )}
          {/* 유저 상태창 */}
          {loginCheck._id !== "0" && toggle ? (
            <UserStatus data={data} image={image} ToggleButton={ToggleButton} />
          ) : null}
        </div>
      </div>

      {/* 메뉴 바 */}
      <div className={styles.nav_service}>
        <MenuBar menubar={menubar} />

        <ul ref={menubar}>
          <div className={styles.nav_service_category}>
            <Link to={"/"}>
              <li
                className={location.pathname === "/" ? styles.location : null}
              >
                홈
              </li>
            </Link>
            <Link to={"/webtoon/naver"}>
              <li className={NowLoaction("naver")}>네이버</li>
            </Link>
            <Link to={"/webtoon/kakao"}>
              <li className={NowLoaction("kakao")}>카카오</li>
            </Link>
            <Link to={"/webtoon/kakaoPage"}>
              <li className={NowLoaction("kakaoPage")}>카카오 페이지</li>
            </Link>
          </div>
          {/* 마이페이지 */}
          <div className={styles.myPage}>
            <div
              onClick={() => {
                if (loginCheck.login) {
                  navigate("/myPage");
                } else {
                  dispatch(login_Open());
                }
              }}
            >
              <li className={NowLoaction("myPage")}>마이 페이지</li>
            </div>
            <div>
              <Link to={"/board/1"}>
                <li className={NowLoaction("board")}>게시판</li>
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
