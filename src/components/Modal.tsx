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
}: any) {
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
      ></div>

      <div className={styles.modal_container}>
        <div className={styles.modal_inner}>
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
