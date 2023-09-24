import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { BoardType } from "../types/board";
import UpdateBoardContain from "../components/Board/Update/UpdateBoardContain";
import Loading from "../components/Loading";
export default function UpdateBoard() {
  const { postNumber } = useParams() as { postNumber: string };
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
  const [board, setBoard] = useState<BoardType>(data);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setLoading(false);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const Update = async () => {
      try {
        const response = await axios.get("/api/boardDeatil", {
          params: { postNumber: parseInt(postNumber) },
        });
        const date = response.data.date.split(":");
        if (response.data.image !== "default.jpg") {
          Image(response.data, date[0]);
        } else {
          setLoading(false);
        }

        setBoard(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    Update();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="Loading">
          <Loading />
        </div>
      ) : (
        <UpdateBoardContain board={board} image={image} />
      )}
    </div>
  );
}
