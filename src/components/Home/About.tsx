import styles from "../../style/Home/About.module.css";

import { AiFillGithub } from "react-icons/ai";

function About() {
  return (
    <div className={styles.about}>
      <div className={styles.about_container}>
        <div>
          <span>
            <span>HyeokjaeLee님</span>의 깃 허브에서 가져온 API를 사용해서
            만들어본 사이트
            <br />
            네이버, 카카오, 카카오페이지 총 3개의 사이트에서 가져온 웹툰
            정보입니다.
            <br />
            <span>
              Node.js서버를 이용하고 mongoDB를 사용한 게시판을 이용해봐주세요.
              좋아요. 와 웹툰 구독도 한번 해주세요.
            </span>
          </span>
          <br />
          <p className={styles.update}>
            업데이트가 되지 않아 최신 버전이 아닐 수도 있습니다...
          </p>
        </div>
        <p>
          <a
            href="https://github.com/HyeokjaeLee/korea-webtoon-api"
            className={styles.api}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
            <span>korea-webtoon-api</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
