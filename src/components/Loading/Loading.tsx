import "./Loading.css";

function Loading() {
  return (
    <>
      <div className="loader">
        <div className="ball moving"></div>
        <div className="balls">
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball moving"></div>
        </div>
      </div>

      <svg style={{ display: "none" }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
        </filter>
      </svg>
    </>
  );
}

export default Loading;
