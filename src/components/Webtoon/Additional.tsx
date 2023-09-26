import styles from "../../style/Webtoon/Additional.module.css";

function Additional({ additional }: any) {
  return (
    <>
      <div className={styles.additional}>
        {additional.new ? <div>New</div> : null}
        {additional.rest ? <div>휴재</div> : null}
        {additional.up ? <div>UP</div> : null}
      </div>
      {additional.adult ? (
        <div className={styles.adult}>
          <p>19</p>
        </div>
      ) : null}
    </>
  );
}
export default Additional;
