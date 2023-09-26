import { useDispatch } from "react-redux";

import { onClose, onUrl } from "../store/ImageStore";

import styles from "../style/Modal/Modal.module.css";

export default function Modal({
  isOpen,
  title,
  input,
  button,
  close,
  fileCheck,
  imageFile,
  form,
  type,
}: any) {
  const dispatch = useDispatch();
  if (!isOpen.isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          background: "black",
          opacity: "0.7",
        }}
        onClick={() => {
          dispatch(onUrl(""));
          dispatch(onClose());
        }}
      ></div>

      <div
        className={styles.modal_container}
        style={
          type === "image" ? { background: "none" } : { background: "#4db9ff" }
        }
      >
        <div
          className={styles.modal_inner}
          style={
            type === "image"
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : { display: "block" }
          }
        >
          {title ? title : null}
          {input ? input : null}
          {fileCheck ? fileCheck : null}
          {imageFile ? imageFile : null}
          {form ? form : null}
          {button ? button : null}
          {close ? close : null}
        </div>
      </div>
    </div>
  );
}
