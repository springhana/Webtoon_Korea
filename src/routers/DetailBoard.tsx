import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DetailBoardContain from "../components/Board/Detail/DetailBoardContain";
import Loading from "../components/Loading";
import YesNo from "../components/Modals/YesNo";

import { BoardType } from "../types/board";
import styles from "../style/Board/DetailBoard.module.css";

const data = {
  _id: "",
  userId: "",
  postNumber: 0,
  author: "",
  title: "",
  content: "",
  date: "",
  image: "",
  likedIds: [],
};

export default function DetailBoard() {
  const { postNumber } = useParams() as { postNumber: string };
  const [detail, setDetail] = useState<BoardType>(data);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  // 이미지 주소 가져오기
  const Image = async (board: BoardType, date: string) => {
    try {
      const response = await axios.get("/api/images", {
        params: {
          userId: board.userId,
          date: date,
          postNumber: board.postNumber,
          image: board.image,
          file: "board",
        },
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  // 게시판 상세 페이지
  const fetch = async () => {
    try {
      const response = await axios.get("/api/boardDeatil", {
        params: {
          postNumber: parseInt(postNumber),
        },
      });
      const date = response.data.date.split(":");
      Image(response.data, date[0]);
      setDetail(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요
  const like = async (_id: string) => {
    try {
      const response = await axios.put("/api/board/like", {
        _id: _id,
      });
      fetch();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  return (
    <div className={styles.detail_board}>
      <YesNo />
      {loading ? (
        <div className="Loading">
          <Loading />
        </div>
      ) : (
        <DetailBoardContain
          postNumber={postNumber}
          detail={detail}
          image={image}
          like={like}
        />
      )}
    </div>
  );
}
