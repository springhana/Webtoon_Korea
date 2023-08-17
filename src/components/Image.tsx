function Image({
  img,
  title,
  service,
  width,
  height,
}: {
  img: string;
  title: string;
  service: string;
  width: number;
  height: number;
}) {
  const imgSize =
    service === "kakaoPage"
      ? {
          width: `${width * 1.5}px`,
          height: `${height * 1.5}px`,
          zIndex: "100",
        }
      : {
          width: `${width * 2}px`,
          height: `${height * 2}px`,
          zIndex: "100",
        };
  return (
    <div style={imgSize}>
      <img src={img} alt={title} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Image;
