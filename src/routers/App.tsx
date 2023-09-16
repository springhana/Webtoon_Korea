import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "../components/Nav/Nav";
import Home from "./Home";
import Webtoon from "./Webtoon";

import { fetchWebtoon } from "../API/webtoon";
import today from "../API/data/day";
import WeekWebtoons from "./WeekWebtoons";

import { imgSize } from "../API/data/imgSize";
import Detail from "./Detail";
import SearchPage from "./SearchPage";
import Footer from "../components/Footer";
import NotFoundPage from "../NotFoundPage";
import Image from "../components/Image";
import Top from "../components/Top";
import LoginModal from "../components/Modals/LoginModal";
import RegisterModal from "../components/Modals/RegisterModal";
import MyPage from "./MyPage";
import Board from "./Board";
import Write from "./Write";
import SearchBoard from "./SearchBoard";
import DetailBoard from "./DetailBoard";
import UpdateBoard from "./UpdateBoard";
import UpdateComment from "./UpdateComment";
import User from "./User";

function App() {
  const [loading, setLoading] = useState(false);
  const [Iwidth, setIwidth] = useState<number>(0);
  const [Iheight, setIheight] = useState<number>(0);
  const [isImageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const removeImageLoad = () => {
    setImageLoaded(false);
  };

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

  async function LoadDay(
    day: string,
    webtoon: string,
    perPage?: number,
    page?: number
  ) {
    try {
      let response = await fetchWebtoon(day, webtoon, perPage, page);
      if (day === "finished") {
        return LoadData(day, webtoon, 3000, 0);
      } else {
        return response.webtoons;
      }
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
      case "kakaoPage":
        setIwidth(Math.round(imgSize[2].width * size));
        setIheight(Math.round(imgSize[2].height * size));
        break;
    }
  }

  const [check, setChecks] = useState(false);
  const [imgs, setImages] = useState("");
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");

  function AddCheck(url: string, title: string, service: string) {
    setImages(url);
    setTitle(title);
    setService(service);
    setChecks(true);
  }

  function TitleColor(title: string) {
    switch (title) {
      case "naver":
        return "#00B500";
      case "kakao":
        return "#F8C600";
      case "kakaoPage":
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

      {check ? (
        <div className="touch_img" style={{ width: `${window.innerWidth}` }}>
          <div
            className="touch_img_container"
            onClick={() => {
              setChecks(false);
            }}
          ></div>
          <Image
            img={imgs}
            title={title}
            service={service}
            width={Iwidth}
            height={Iheight}
          />
        </div>
      ) : (
        <Top />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              load={LoadData}
              loading={loading}
              TitleColor={TitleColor}
              handleImageLoad={handleImageLoad}
              removeImageLoad={removeImageLoad}
              isImageLoaded={isImageLoaded}
            />
          }
        />

        <Route
          path="/webtoon/:webtoon"
          element={
            <Webtoon
              load={LoadDay}
              img={img}
              Iwidth={Iwidth}
              Iheight={Iheight}
              handleImageLoad={handleImageLoad}
              removeImageLoad={removeImageLoad}
              isImageLoaded={isImageLoaded}
            />
          }
        />
        <Route
          path="/webtoon/week/:webtoon/:day"
          element={
            <WeekWebtoons
              img={img}
              Iwidth={Iwidth}
              Iheight={Iheight}
              handleImageLoad={handleImageLoad}
              removeImageLoad={removeImageLoad}
              isImageLoaded={isImageLoaded}
            />
          }
        />
        <Route
          path="/webtoon/detail/:title"
          element={
            <Detail
              AddCheck={AddCheck}
              img={img}
              width={Iwidth}
              height={Iheight}
              handleImageLoad={handleImageLoad}
              removeImageLoad={removeImageLoad}
              TitleColor={TitleColor}
            />
          }
        />
        <Route
          path="/webtoon/search/:title"
          element={
            <SearchPage
              TitleColor={TitleColor}
              handleImageLoad={handleImageLoad}
              removeImageLoad={removeImageLoad}
            />
          }
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
