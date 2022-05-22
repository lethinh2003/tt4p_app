import { Typography, Box, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import convertToTime from "../../utils/convertTime";
import readingTime from "reading-time";
import { BiTimeFive } from "react-icons/bi";
import { RiBookOpenLine } from "react-icons/ri";

const IntroducePost = (props) => {
  const [timeReading, setTimeReading] = useState(0);
  const { item } = props;
  useEffect(() => {
    if (item) {
      const stats = readingTime(item.content);
      const getMinutes = stats.text.split(" ");

      setTimeReading(getMinutes[0]);
    }
  }, []);

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));
  return (
    <>
      {item && (
        <>
          <Box
            as={motion.div}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              cursor: "pointer",
              height: "250px",
              border: (theme) => `3px solid ${theme.palette.border.feeds}`,
              backgroundColor: item.color ? item.color : "#ccc",
              borderRadius: "30px",
              overflow: "hidden",
              boxShadow: (theme) =>
                `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
              display: "flex",
              fontSize: "3rem",
              color: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              padding: "20px",
            }}
          >
            {item.title}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                flex: 1,
                width: "100%",
                gap: "10px",
              }}
            >
              <AvatarProfile
                alt={item.user[0].name}
                src={item.user[0].avatar}
              />
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  width: "100px",
                  whiteSpace: "nowrap",
                  overflow: "hidden !important",
                  textOverflow: "ellipsis",
                }}
              >
                {item.user[0].name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                fontSize: "2rem",
                height: "100%",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.second,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <BiTimeFive />
                {convertToTime(item.createdAt)}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                fontSize: "2rem",
                height: "100%",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.second,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <RiBookOpenLine />
                {`${timeReading} phút đọc `}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default IntroducePost;
