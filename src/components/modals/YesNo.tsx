import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Yes, onClose } from "../../store/YesNo";
import styles from "../../style/Modal/YesNo.module.css";
import { ReduxType } from "../../types/redux";

export default function YesNo() {
  const YesNo = useSelector((state: ReduxType) => {
    return state.yesNo;
  });
  const dispatch = useDispatch();
  if (!YesNo.open) {
    return null;
  }

  return (
    <div className={styles.YesNo_Modal}>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          background: "black",
          opacity: "0.7",
        }}
      ></div>

      <div className={styles.YesNo_Modal_outter}>
        <div className={styles.YesNo_title}>정말 삭제하시겠습니까?</div>
        <button
          onClick={() => {
            dispatch(Yes());
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            dispatch(onClose());
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
