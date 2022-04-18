import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Introduce = () => {
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
          fontSize: "35px",
          alignSelf: "center",
        }}
      >
        Hôm nay là {convertDay(new Date().getDay())}, thời điểm vàng để tìm bạn
        tâm sự nhaaa
      </Typography>
    </>
  );
};
export default Introduce;
