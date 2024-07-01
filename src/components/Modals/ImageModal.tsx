import React from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { ReduxType } from "../../types/redux";
import styles from "../../style/Modal/Modal.module.css";
import { onClose } from "../../store/ImageStore";
import { AiFillCloseCircle } from "react-icons/ai";
export default function ImageModal() {
  let login = useSelector((state: ReduxType) => {
    return state.image;
  });
  const dispatch = useDispatch();
  const title = (
    <div>
      <img src={login.url} alt={"이미지"} style={{ width: "100%" }} />
    </div>
  );
  const close = (
    <button
      className={styles.close}
      onClick={() => {
        dispatch(onClose());
      }}
    >
      <AiFillCloseCircle color="white" />
    </button>
  );
  return <Modal isOpen={login} title={title} close={close} type={"image"} />;
}
