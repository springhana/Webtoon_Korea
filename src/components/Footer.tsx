import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { SiWebtoon, SiKakao } from "react-icons/si";
import styles from "../style/Footer.module.css";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.div}></div>
      <div className={styles.footer_container}>
        <div className={styles.info_inner}>
          <div className={styles.info}>
            <ul>
              <p>Webtoon</p>
              <li>
                <a
                  href="https://comic.naver.com/index"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWebtoon color="#00B500" size="20" />
                  <span>네이버</span>
                </a>
              </li>
              <li>
                <a
                  href="https://webtoon.kakao.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiKakao color="#F8C600" size="20" />
                  <span>카카오</span>
                </a>
              </li>
              <li>
                <a
                  href="https://page.kakao.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiKakao color="#F7B600" size="20" />
                  <span>카카오페이지</span>
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.info}>
            <p>소개</p>
            <ul>
              <li>
                <span>취준생의 포트폴리오</span>
              </li>
            </ul>
          </div>
          <div className={styles.info}>
            <p>기술</p>
            <ul>
              <li>JavaScript - React</li>
              <li>HTML, CSS, SCSS</li>
              <li>TypeScript, Ajax</li>
              <li>Redux - 미숙함</li>
            </ul>
          </div>
        </div>

        <div className={styles.Email}>
          <p>Email</p>

          <ul>
            <li>
              <a
                href="https://github.com/springhana"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub color="black" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram color="red" />
              </a>
            </li>
            <li>
              <a
                href="https://ko-kr.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillFacebook color="blue" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/?lang=ko"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillTwitterCircle color="skyBlue" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
