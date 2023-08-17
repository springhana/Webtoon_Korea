import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import Nav from "./components/Nav";
import Home from "./routers/Home";
import Webtoon from "./routers/Webtoon";

import { naver, kakao, kakaoPage } from "./store/webtoonStore";
import { fetchDetail_Search, fetchWebtoon } from "./API/webtoon";
import today from "./API/data/day";
import services from "./API/data/service";
import WeekWebtoons from "./routers/WeekWebtoons";

import {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
} from "./store/webtoonDayStore";
import { daysOfWeek } from "./API/data/date";
import { imgSize } from "./API/data/imgSize";
import Detail from "./routers/Detail";
import { detail_Search } from "./store/Detail_SearchStore";
import SearchPage from "./routers/SearchPage";
import Footer from "./components/Footer";
import NotFoundPage from "./NotFoundPage";
import Image from "./components/Image";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [Iwidth, setIwidth] = useState<any>(0);
  const [Iheight, setIheight] = useState<any>(0);
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
      if (service === services[0]) {
        dispatch(naver(response));
      } else if (service === services[1]) {
        dispatch(kakao(response));
      } else if (service === services[2]) {
        dispatch(kakaoPage(response));
      }

      setLoading(true);
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
      if (day === daysOfWeek[0]) {
        dispatch(sunday(response));
      } else if (day === daysOfWeek[1]) {
        dispatch(monday(response));
      } else if (day === daysOfWeek[2]) {
        dispatch(tuesday(response));
      } else if (day === daysOfWeek[3]) {
        dispatch(wednesday(response));
      } else if (day === daysOfWeek[4]) {
        dispatch(thursday(response));
      } else if (day === daysOfWeek[5]) {
        dispatch(friday(response));
      } else if (day === daysOfWeek[6]) {
        dispatch(saturday(response));
      } else if (day === "finished") {
        LoadData(day, webtoon, 3000, 0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Detail_Search(title: string) {
    let response = await fetchDetail_Search(title);
    dispatch(detail_Search(response));
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
    <div
      className="App"
      style={check ? { overflow: "hidden" } : { overflow: "auto" }}
    >
      <Nav />
      {check ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            width: "100%",
            height: "100vh",

            zIndex: "100",
            overflowY: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              background: "black",
              opacity: "0.8",
              width: "100%",
              height: "100%",
            }}
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
      ) : null}
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
          path="/webtoon/detail/:title"
          element={
            <Detail
              load={Detail_Search}
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
              load={Detail_Search}
              TitleColor={TitleColor}
              handleImageLoad={handleImageLoad}
              removeImageLoad={removeImageLoad}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
