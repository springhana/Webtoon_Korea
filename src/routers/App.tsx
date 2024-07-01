import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "../components/Nav/Nav";
import Home from "./Home";

// 컴포넌트
import Webtoon from "./Webtoon";
import WeekWebtoons from "./WeekWebtoons";
import Detail from "./Detail";
import SearchPage from "./SearchPage";
import Footer from "../components/Footer";
import Top from "../components/Top";
import LoginModal from "../components/Modals/LoginModal";
import RegisterModal from "../components/Modals/RegisterModal";
import DetailBoard from "./DetailBoard";
import SearchBoard from "./SearchBoard";
import UpdateBoard from "./UpdateBoard";
import UpdateComment from "./UpdateComment";
import MyPage from "./MyPage";
import Board from "./Board";
import Write from "./Write";
import NotFoundPage from "../NotFoundPage";
import User from "./User";
import Chat from "../components/Chat/Chat";
import Profile from "./Profile";
import ImageModal from "../components/Modals/ImageModal";

import { fetchWebtoon } from "../API/webtoon";
import { imgSize } from "../API/data/imgSize";
import today from "../API/data/day";

function App() {
  const [Iwidth, setIwidth] = useState<number>(0);
  const [Iheight, setIheight] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function LoadData(
    now: string = today,
    service?: string,
    perPage?: number,
    page?: number
  ) {
    try {
      let response = await fetchWebtoon(now, service, perPage, page);
      setLoading(true);
      return response.webtoons;
    } catch (error) {
      console.log(error);
    }
  }

  function img(url: string, size: number = 1) {
    switch (url) {
      case "naver":
        setIwidth(Math.round(imgSize[0].width * size));
        setIheight(Math.round(imgSize[0].height * size));
        break;
      case "kakao":
        setIwidth(Math.round(imgSize[1].width * size));
        setIheight(Math.round(imgSize[1].height * size));
        break;
      case "kakao_Page":
        setIwidth(Math.round(imgSize[2].width * size));
        setIheight(Math.round(imgSize[2].height * size));
        break;
    }
  }

  function TitleColor(title: string) {
    switch (title) {
      case "naver":
        return "#00B500";
      case "kakao":
        return "#F8C600";
      case "kakao_Page":
        return "#F7B600";
      default:
        return "black";
    }
  }

  return (
    <div className="App">
      <Nav />
      <LoginModal />
      <RegisterModal />
      <ImageModal />
      <Top />

      <Routes>
        <Route
          path="/"
          element={
            <Home load={LoadData} loading={loading} TitleColor={TitleColor} />
          }
        />
        <Route
          path="/webtoon/:webtoon"
          element={<Webtoon img={img} Iwidth={Iwidth} Iheight={Iheight} />}
        />
        <Route
          path="/webtoon/week/:webtoon/:day"
          element={<WeekWebtoons img={img} Iwidth={Iwidth} Iheight={Iheight} />}
        />
        <Route
          path="/webtoon/detail/:title/:service"
          element={
            <Detail
              img={img}
              width={Iwidth}
              height={Iheight}
              TitleColor={TitleColor}
            />
          }
        />
        <Route
          path="/webtoon/search/:title"
          element={<SearchPage TitleColor={TitleColor} />}
        />

        <Route path="/myPage" element={<MyPage />} />
        <Route path="/board/:page" element={<Board />} />
        <Route path="/board/write" element={<Write />} />
        <Route path="/detail/:postNumber" element={<DetailBoard />} />
        <Route path="/update/:postNumber" element={<UpdateBoard />} />
        <Route
          path="/update_Comment/:totalComment"
          element={<UpdateComment />}
        />
        <Route path="/search/:value" element={<SearchBoard />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile/:_id" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* 채팅 */}
      <Chat />
      <Footer />
    </div>
  );
}

export default App;
