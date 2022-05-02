import { Box, DialogContentText, Typography, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const Author = () => {
  const [dataSystem, setDataSystem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSystemData();
  }, []);
  const getSystemData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/systems`
      );

      setIsLoading(false);
      setDataSystem(res.data.data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const BoxAvatar = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    maxWidth: "200px",
    fontWeight: "bold",
    height: "200px",
    borderRadius: "50px",
    position: "relative",
    "&::before": {
      borderRadius: "50px",
      border: "2px solid #6edee0",
      position: "absolute",
      content: `""`,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      transform: "scale(1.1)",
    },
  }));
  return (
    <>
      {isLoading && (
        <>
          {Array.from({ length: 5 }).map((item, i) => (
            <Skeleton key={i} animation="wave" height={20} />
          ))}
        </>
      )}
      {!isLoading && dataSystem && (
        <>
          <DialogContentText>Người sáng lập</DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              flexWrap: "wrap",
            }}
          >
            <Typography>Name: {dataSystem.author}</Typography>
            <Typography>Zalo: {dataSystem.zalo}</Typography>
            <Typography>Facebook: {dataSystem.facebook}</Typography>
            <Typography>Mail: {dataSystem.email}</Typography>
          </Box>
          {dataSystem.question_reply &&
            dataSystem.question_reply.length > 0 &&
            dataSystem.question_reply.map((item, i) => (
              <div key={i}>
                <DialogContentText>{item.question}</DialogContentText>
                <Typography>{item.reply}</Typography>
              </div>
            ))}
        </>
      )}
    </>
  );
};
export default Author;
