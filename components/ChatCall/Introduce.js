import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
const Introduce = () => {
  const myVideo = useRef(null);
  const [stream, setStream] = useState("");
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        myVideo.current.srcObject = stream;
        setStream(stream);
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, []);
  // const { boy, girl, lgbt } = dataUserWaiting;
  const convertDay = (day) => {
    let weekDay = "";
    let dayNum = day;
    dayNum = dayNum + 1;

    if (dayNum == 1) {
      weekDay = "chủ nhật";
    } else {
      weekDay = `thứ ${dayNum}`;
    }
    return weekDay;
  };

  return (
    <>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Hôm nay là {convertDay(new Date().getDay())}, thời điểm vàng để tìm bạn
        tâm sự nhaaa
      </Typography>
      <video ref={myVideo} autoPlay muted />
    </>
  );
};
export default Introduce;
