import { Box, Typography } from "@mui/material";
const Introduce = () => {
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
          color: (theme) => theme.palette.text.color.first,
        }}
      >
        Hôm nay là {convertDay(new Date().getDay())}, thời điểm vàng để tìm bạn
        tâm sự nhaaa
      </Typography>
    </>
  );
};
export default Introduce;
