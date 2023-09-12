import styles from "../style/Nav.module.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./search/SearchBar";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import {
  addId,
  login,
  onOpen as login_Open,
  removeId,
} from "../store/LoginStore";
import { useEffect, useState } from "react";
import { logout, login as login_check } from "../store/LoginStore";
import axios from "axios";
function Nav() {
  const dispatch = useDispatch();
  const [id, setId] = useState<any>(null);

  const location = useLocation();
  const navigate = useNavigate();
  let loginCheck = useSelector((state: any) => {
    return state.loginCheck;
  });

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
  const Logout = async () => {
    try {
      const response = await axios.get("/api/logout");
      dispatch(logout());
      dispatch(removeId());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const LoginCheck = async () => {
      try {
        const response: any = await axios.get("/api/loginCheck");
        if (response.data.login) {
          setId(response.data._id);
          dispatch(login_check());
          dispatch(addId(response.data._id));
        } else {
          setId(null);
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
            <button
              className={styles.login_btn}
              onClick={() => {
                Logout();
              }}
            >
              로그아웃
            </button>
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
        </div>
      </div>

      <div className={styles.nav_service}>
        <ul>
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
