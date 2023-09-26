import { useEffect } from "react";

import Webtoons from "../components/Home/Webtoons";
import About from "../components/Home/About";
import Loading from "../components/Loading";

import services from "../API/data/service";
import { imgSize } from "../API/data/imgSize";
import { Ktoday } from "../API/data/date";
import styles from "../style/Home/Home.module.css";

function Home({
  load,
  loading,
  TitleColor,
}: {
  load: () => void;
  loading: boolean;
  TitleColor: (title: string) => string;
}) {
  useEffect(() => {
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
