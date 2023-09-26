import { AiOutlineArrowUp } from "react-icons/ai";

export default function Top() {
  function TopMove() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="top_move" onClick={TopMove}>
      <AiOutlineArrowUp size={30} color="black" />
    </div>
  );
}
