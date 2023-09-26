import styles from "../style/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.screen}></div>
      <div className={styles.container}>
        <div className={styles.circle}></div>
        <div className={styles.square}></div>
        <div className={styles.triangle}></div>
        <div className={styles.logo}>Webtoon</div>
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
}
