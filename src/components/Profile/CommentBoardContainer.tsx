import axios from "axios";
import { useEffect, useState } from "react";
import BoardContain from "../Board/BoardContain";

export default function CommentBoardContainer({ data }: any) {
  const [board, setBoard] = useState<any>([]);
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
  });
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
