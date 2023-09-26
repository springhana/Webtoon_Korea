import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout, removeId } from "../../store/LoginStore";

import styles from "../../style/Nav/UserStatus.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { UserType } from "../../types/user";

export default function UserStatus({
  data,
  image,
  ToggleButton,
}: {
  data: UserType;
  image: string;
  ToggleButton: () => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const response = await axios.get("/api/logout");
      dispatch(logout());
      dispatch(removeId());
      ToggleButton();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.header}>
      <button
        className={styles.close}
        onClick={() => {
          ToggleButton();
        }}
      >
        <AiFillCloseCircle />
      </button>
      <p>{data.email}</p>
      <div className={styles.img_pic}>
        {image ? <img src={image} alt={image} /> : null}
      </div>
      <h3 className={styles.name}>반가워요. {data.name}님</h3>
      <div className={styles.btn}>
        <button onClick={Logout}>로그아웃</button>
        <button
          onClick={() => {
            navigate("/user");
            ToggleButton();
          }}
        >
          정보 수정
        </button>
      </div>
    </div>
  );
}
