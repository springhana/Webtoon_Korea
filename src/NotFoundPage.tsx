import styles from "./style/NotFoundPage.module.css";
import { useRef, useState } from "react";

function NotFoundPage() {
  const dynamic: any = useRef();
  const myProject: any = useRef();

  const randomString = () => {
    const stringArr = ["404-NotFound", "404-Error", "클릭해보세요."];
    let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
    let selectStringArr = selectString.split("");

    return selectStringArr;
  };

  const Typing = (Arr: any) => {
    if (Arr.length > 0) {
      if (dynamic.current) dynamic.current.innerHTML += Arr.shift(); //배열의 맨 앞에 값을 제거헤서 뿌려준다
      setTimeout(() => {
        Typing(Arr);
      }, 80);
    } else if (Arr.length === 0) {
      setTimeout(Reset, 3000);
    }
  };

  const Reset = () => {
    if (dynamic.current) {
      dynamic.current.innerHTML = "";
      Typing(randomString());
    }
  };

  Typing(randomString());

  const move = (type: string, e: any) => {
    e.stopPropagation();
    if (type === "wrap") {
      myProject.current.style.scale = "1";
      myProject.current.style.left = "50%";
    } else if (type === "myProject") {
      myProject.current.style.left = "200%";
      myProject.current.style.scale = "0";
      setTimeout(() => {
        myProject.current.style.left = "-100%";
      }, 300);
    }
  };
  return (
    <div className={styles.main}>
      <div
        className={styles.wrap}
        onClick={(e: any) => {
          setTimeout(() => {
            move("wrap", e);
          }, 200);
        }}
      >
        <h1>
          <span className={styles.icons}>
            <img src="img/1481.gif" alt="" />
          </span>
        </h1>
        <p className={styles.text} ref={dynamic}></p>
        <p className={styles.text_s}>페이지가 없습니다.</p>
      </div>

      <div
        className={styles.myProject}
        ref={myProject}
        onClick={(e: any) => {
          setTimeout(() => {
            move("myProject", e);
          }, 200);
        }}
      >
        <ul>
          <li>
            배포 백엔드 : <span>Cloud Type</span>
          </li>
          <li>Node.js, MongoDB</li>
          <li>
            배포 프론트 : <span>Netlify</span>
          </li>
          <li>HTML, CSS, TYPESCRIPT, REACT</li>
        </ul>
      </div>
    </div>
  );
}

export default NotFoundPage;
