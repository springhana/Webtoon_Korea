import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Subscribe from "../components/MyPage/Subscribe";

import { imgSize } from "../API/data/imgSize";
import { onOpen as loginOpen } from "../store/LoginStore";
import { ReduxType } from "../types/redux";
import styles from "../style/MyPage/Subscribe.module.css";

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [webtoons, setWebtoons] = useState<string[]>([]); // 구독 목록
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(0);

  const loginCheck = useSelector((state: ReduxType) => {
    return state.loginCheck;
  });

  useEffect(() => {
    const Login = async () => {
      try {
        const response = await axios.get(`/api/myPage/${loginCheck._id}`);
        if (response.data.login) {
          setUser(response.data.name);
          console.log(response.data.name);
        } else {
          dispatch(loginOpen());
        }
      } catch (error) {
        console.log(error);
      }
    };
    Login();
  }, []);

  useEffect(() => {
    const subscribe = async () => {
      try {
        const response = await axios.get("/api/subscribeAll");
        console.log(response.data);
        setWebtoons((item) => (item = response.data.title));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    subscribe();
  }, [loginCheck._id, loginCheck.login]);

  function width(service: string) {
    switch (service) {
      case "naver":
        return `${imgSize[0].width}px`;
      case "kakao":
        return `${imgSize[1].width}px`;
      case "kakaoPage":
        return `${imgSize[2].width}px`;
    }
  }
  function height(service: string) {
    switch (service) {
      case "naver":
        return `${imgSize[0].height}px`;
      case "kakao":
        return `${imgSize[1].height}px`;
      case "kakaoPage":
        return `${imgSize[2].height}px`;
    }
  }

  if (!loginCheck.login) {
    navigate("/");
  }
  return (
    <div className={styles.main}>
      <div className={styles.user}>
        <div>{user}님 환영합니다.</div>
        <button
          onClick={() => {
            navigate(`/profile/${loginCheck._id}`);
          }}
        >
          내 글 보기
        </button>
        <button
          onClick={() => {
            setToggle(0);
          }}
        >
          구독 보기
        </button>
        <button
          onClick={() => {
            navigate("/user");
          }}
        >
          자기정보 보기
        </button>
      </div>

      {toggle === 0 ? (
        <div className={styles.myPage}>
          {loading ? (
            <div className={styles.text}>구독을 해주세요</div>
          ) : (
            webtoons.map((webtoon: string, index: number) => (
              <div key={index}>
                <Subscribe
                  webtoon={webtoon}
                  Iwidth={width as (service: string) => string}
                  Iheight={height as (service: string) => string}
                />
              </div>
            ))
          )}
          <div style={{ clear: "both" }}></div>
        </div>
      ) : null}
    </div>
  );
}
