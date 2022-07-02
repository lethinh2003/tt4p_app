import { Button, Typography, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
const CountFindPartner = ({ handleTimeoutFindPartner }) => {
  const timeCountRef = useRef(null);
  const [timeCount, setTimeCount] = useState(5);
  useEffect(() => {
    if (timeCount <= 0) {
      clearInterval(timeCountRef.current);
      handleTimeoutFindPartner();
    } else {
      timeCountRef.current = setInterval(() => {
        setTimeCount((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timeCountRef.current);
  }, [timeCount]);
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          minWidth: "80px",
          border: (theme) => `3px solid ${theme.palette.border.feeds}`,

          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: (theme) =>
            `0px 3px 20px 6px ${theme.palette.feeds.boxShadow}`,
          display: "flex",
          fontSize: "3rem",
          color: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          padding: "20px",

          color: (theme) => theme.palette.text.color.second,
        }}
      >
        {timeCount}
      </Box>
    </>
  );
};
export default CountFindPartner;
