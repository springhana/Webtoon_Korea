import styles from "../style/ArrowBtn.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function ArrowBtn({
  move,
  prev,
  next,
  size,
  nextCheck,
  prevCheck,
}: {
  move: (type: string) => void;
  prev: React.RefObject<HTMLDivElement>;
  next: React.RefObject<HTMLDivElement>;
  size: { width: number; height: number };
  nextCheck: boolean;
  prevCheck: boolean;
}) {
  function BtnStyle(type: boolean) {
    return type
      ? {
          scale: "1",
          bottom: `${(size.height + 50) / 2}px`,
        }
      : { scale: "0", bottom: `${(size.height + 50) / 2}px` };
  }
  return (
    <>
      <div
        className={styles.next}
        onClick={() => move("next")}
        ref={next}
        style={BtnStyle(nextCheck)}
      >
        <FaArrowRight />
      </div>
      <div
        className={styles.prev}
        onClick={() => move("prev")}
        ref={prev}
        style={BtnStyle(prevCheck)}
      >
        <FaArrowLeft />
      </div>
    </>
  );
}
export default ArrowBtn;
