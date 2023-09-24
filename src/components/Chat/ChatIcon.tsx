import styles from "../../style/Chat/ChatIcon.module.css";
import { BsFillChatDotsFill } from "react-icons/bs";
export default function ChatIcon() {
  return (
    <div className={styles.icon}>
      <BsFillChatDotsFill size={30} />
    </div>
  );
}
