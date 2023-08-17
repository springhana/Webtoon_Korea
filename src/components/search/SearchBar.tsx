import { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [title, setTitle] = useState();
  const navigate = useNavigate();
  return (
    <div className="container">
      <form
        onSubmit={() => {
          navigate(`/webtoon/search/${title}`);
        }}
      >
        <input
          type="text"
          placeholder="제목, 작가를 검색할 수 있습니다."
          onChange={(e: any) => setTitle(e.target.value)}
        />
        <div className="search"></div>
      </form>
    </div>
  );
}
export default SearchBar;
