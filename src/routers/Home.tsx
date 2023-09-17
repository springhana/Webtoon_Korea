import styles from "../style/Home/Home.module.css";
import { useEffect } from "react";

import services from "../API/data/service";

import Webtoons from "../components/Home/Webtoons";
import { imgSize } from "../API/data/imgSize";
import { Ktoday } from "../API/data/date";
import About from "../components/Home/About";
import Loading from "../components/Loading";

function Home({
  load,
  loading,
  TitleColor,
  handleImageLoad,
  removeImageLoad,
  isImageLoaded,
}: {
  load: () => void;
  loading: boolean;
  TitleColor: (title: string) => string;
  handleImageLoad: () => void;
  removeImageLoad: () => void;
  isImageLoaded: boolean;
}) {
  useEffect(() => {
    removeImageLoad();
    load();
  }, []);

  return (
    <div className={styles.home}>
      {loading ? (
        <div>
          <div className={styles.Home_today}>{Ktoday}요일 웹툰</div>
          {services.map((data, index) => (
            <div key={index} className={styles.Home_webtoon}>
              <Webtoons
                title={data}
                load={load}
                size={imgSize[index]}
                TitleColor={TitleColor}
                handleImageLoad={handleImageLoad}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="Loading">
          <Loading />
        </div>
      )}
      <About />
    </div>
  );
}
export default Home;
