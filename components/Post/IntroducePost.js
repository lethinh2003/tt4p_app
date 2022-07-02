import { Avatar, Box, Typography, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import readingTime from "reading-time";
import convertToTime from "../../utils/convertTime";
import { BigHead } from "@bigheads/core";
import { useSelector } from "react-redux";
import checkUserOnline from "../../utils/checkUserOnline";
const IntroducePost = (props) => {
  const [timeReading, setTimeReading] = useState(0);
  const { item } = props;
  const listUsersOnline = useSelector((state) => state.usersOnline);
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    if (item) {
      const stats = readingTime(item.content);
      const getMinutes = stats.text.split(" ");

      setTimeReading(getMinutes[0]);
    }
  }, []);
  useEffect(() => {
    const checkOnline = checkUserOnline(item.user[0], listUsersOnline);
    setIsOnline(checkOnline);
  }, [listUsersOnline]);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isOnline ? "#44b700" : "#cb1760",
      color: isOnline ? "#44b700" : "#cb1760",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  }));
  return (
    <>
      {item && (
        <>
          <Box
            sx={{
              textAlign: "center",
              minHeight: "250px",
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
            <Typography
              component="h1"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Typography>
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
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",

                    borderRadius: "50%",
                    position: "relative",
                    overflow: "hidden",
                    border: "2px solid #23303a",
                    boxShadow: "0px 3px 15px 0px #23303a",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "50px",
                    }}
                  >
                    <BigHead
                      accessory={item.user[0].avatarSVG.accessory}
                      body={item.user[0].avatarSVG.body}
                      circleColor={item.user[0].avatarSVG.circleColor}
                      clothing={item.user[0].avatarSVG.clothing}
                      clothingColor={item.user[0].avatarSVG.clothingColor}
                      eyebrows={item.user[0].avatarSVG.eyebrows}
                      eyes={item.user[0].avatarSVG.eyes}
                      faceMask={item.user[0].avatarSVG.faceMask}
                      faceMaskColor={item.user[0].avatarSVG.faceMaskColor}
                      facialHair={item.user[0].avatarSVG.facialHair}
                      graphic={item.user[0].avatarSVG.graphic}
                      hair={item.user[0].avatarSVG.hair}
                      hairColor={item.user[0].avatarSVG.hairColor}
                      hat={item.user[0].avatarSVG.hat}
                      hatColor={item.user[0].avatarSVG.hatColor}
                      lashes={item.user[0].avatarSVG.lashes}
                      lipColor={item.user[0].avatarSVG.lipColor}
                      mask={item.user[0].avatarSVG.mask}
                      mouth={item.user[0].avatarSVG.mouth}
                      skinTone={item.user[0].avatarSVG.skinTone}
                    />
                  </Box>
                </Box>
              </StyledBadge>
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
                📅 {convertToTime(item.createdAt)}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default IntroducePost;
