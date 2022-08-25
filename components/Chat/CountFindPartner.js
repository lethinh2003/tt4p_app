import { Button, Typography, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
const CountFindPartner = ({ handleTimeoutFindPartner }) => {
  const timeCountRef = useRef(null);
  const [timeCount, setTimeCount] = useState(30);
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
          minWidth: "80px",

          borderRadius: "10px",
          overflow: "hidden",

          display: "flex",
          fontSize: "3rem",
          color: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          padding: "20px",
          border: (theme) => `1px solid ${theme.palette.border.dialog}`,
          color: (theme) => theme.palette.text.color.second,
        }}
      >
        {timeCount}
      </Box>
    </>
  );
};
export default CountFindPartner;
