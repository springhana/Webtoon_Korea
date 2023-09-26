import axios from "axios";
import { useEffect, useState } from "react";
import BoardContain from "../Board/BoardContain";

import { commentType } from "../../types/comment";
import { BoardType } from "../../types/board";

const init = {
  author: "",
  content: "",
  date: "",
  image: "",
  likedIds: [],
  postNumber: 0,
  title: "",
  userId: "",
  _id: "",
};

export default function CommentBoardContainer({ data }: { data: commentType }) {
  const [board, setBoard] = useState<BoardType>(init);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/myComment/board", {
          params: { _id: data.boardId },
        });
        setBoard(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {loading ? null : (
        <div>
          <BoardContain data={board} />
        </div>
      )}
    </div>
  );
}
