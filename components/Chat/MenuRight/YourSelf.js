import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { BsListStars } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import Image from "next/image";
import { useSelector } from "react-redux";
import { BigHead } from "@bigheads/core";

const YourSelf = ({ dataUser }) => {
  const partnersCount = useSelector((state) => state.partnersCount);
  const messagesCount = useSelector((state) => state.messagesCount);
  const BoxTitleItem = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "5px",
    color: theme.palette.text.color.first,
    borderRadius: "5px",
    "&:hover": {
      border: `1px solid ${theme.palette.border.dialog}`,
      color: theme.palette.text.color.active,
      boxShadow: "2px 2px 4px 0px #c3cddbab",
    },

    "& .table_content.active": {
      color: theme.palette.text.color.active,
    },
  }));

  return (
    <>
      {dataUser && (
        <Box
          sx={{
            paddingBottom: "30px",
            borderBottom: "1px solid #52586666",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",

              color: (theme) => theme.palette.text.color.first,
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {dataUser.data.sex === "boy" ? "👨🏻" : "👩🏻"} Thông tin cá nhân
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              width: "100%",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "100px",
                height: "100px",

                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
                border: "2px solid #23303a",
                boxShadow: "0px 3px 15px 0px #23303a",
              }}
            >
              {/* <Image
                src={dataUser.data.avatar}
                alt={dataUser.data.name}
                objectFit="cover"
                layout="fill"
              /> */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                }}
              >
                <BigHead
                  accessory={dataUser.data.avatarSVG.accessory}
                  body={dataUser.data.avatarSVG.body}
                  circleColor={dataUser.data.avatarSVG.circleColor}
                  clothing={dataUser.data.avatarSVG.clothing}
                  clothingColor={dataUser.data.avatarSVG.clothingColor}
                  eyebrows={dataUser.data.avatarSVG.eyebrows}
                  eyes={dataUser.data.avatarSVG.eyes}
                  faceMask={dataUser.data.avatarSVG.faceMask}
                  faceMaskColor={dataUser.data.avatarSVG.faceMaskColor}
                  facialHair={dataUser.data.avatarSVG.facialHair}
                  graphic={dataUser.data.avatarSVG.graphic}
                  hair={dataUser.data.avatarSVG.hair}
                  hairColor={dataUser.data.avatarSVG.hairColor}
                  hat={dataUser.data.avatarSVG.hat}
                  hatColor={dataUser.data.avatarSVG.hatColor}
                  lashes={dataUser.data.avatarSVG.lashes}
                  lipColor={dataUser.data.avatarSVG.lipColor}
                  mask={dataUser.data.avatarSVG.mask}
                  mouth={dataUser.data.avatarSVG.mouth}
                  skinTone={dataUser.data.avatarSVG.skinTone}
                />
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                {dataUser.data.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                @{dataUser.data.account}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",
              alignItems: "center",

              width: "100%",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                boxShadow: (theme) =>
                  `0px 3px 20px 1px ${theme.palette.feeds.boxShadow}`,
                backgroundColor: "#ccf1fa",
                width: "100px",
                alignItems: "center",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "#464e5a",
                }}
              >
                Partners
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                👨🏻{partnersCount}
              </Typography>
            </Box>
            <Box
              sx={{
                boxShadow: (theme) =>
                  `0px 3px 20px 1px ${theme.palette.feeds.boxShadow}`,
                backgroundColor: "#ccf1fa",
                width: "100px",
                alignItems: "center",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "#464e5a",
                }}
              >
                Messages
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                💬 {messagesCount}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default YourSelf;
