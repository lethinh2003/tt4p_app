import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";
import { BigHead } from "@bigheads/core";

const YourSelf = ({ user }) => {
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
  const BoxAvatarChild = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "50px",

    fontWeight: "bold",
    height: "50px",
    borderRadius: "5px",
    position: "absolute",
    "&.tt-1": {
      right: "-75px",
      top: "24px",
      backgroundColor: "#e5f99f",
    },
    "&.tt-2": {
      left: "-75px",
      width: "40px",
      height: "40px",
      backgroundColor: "#e5cbd6",
    },
    "&.tt-3": {
      bottom: "33px",
      left: "-65px",
      backgroundColor: "#ccf1fa",
    },
    "&.tt-4": {
      backgroundColor: "#ceafcf",
      bottom: "42px",
      right: "-76px",
      width: "40px",
      height: "40px",
    },
  }));

  const listAvatarChild = [
    {
      img: "https://i.imgur.com/xywmm0q.png",
    },
    {
      img: "https://i.imgur.com/e1i79Gf.png",
    },
    {
      img: "https://i.imgur.com/DdMnBN1.png",
    },
    {
      img: "https://i.imgur.com/meWx1dO.png",
    },
  ];

  return (
    <>
      {user && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                alignSelf: "center",
              }}
            >
              Hii {user.name}
            </Typography>

            <Box
              sx={{
                position: "relative",
              }}
            >
              {listAvatarChild.map((item, i) => (
                <BoxAvatarChild
                  as={motion.div}
                  animate={{
                    y: i === 0 ? [0, 10, 0] : i === 1 ? [0, -10, 0] : 0,
                    x: i === 2 ? [0, 10, 0] : i === 3 ? [0, -10, 0] : 0,
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.03,
                  }}
                  key={i}
                  className={`tt-${i + 1}`}
                >
                  <Image
                    src={item.img}
                    alt="Avatar cute"
                    width={200}
                    height={200}
                  />
                </BoxAvatarChild>
              ))}
              <Box
                sx={{
                  width: "250px",
                }}
              >
                <BigHead
                  accessory={user.avatarSVG.accessory}
                  body={user.avatarSVG.body}
                  circleColor={user.avatarSVG.circleColor}
                  clothing={user.avatarSVG.clothing}
                  clothingColor={user.avatarSVG.clothingColor}
                  eyebrows={user.avatarSVG.eyebrows}
                  eyes={user.avatarSVG.eyes}
                  faceMask={user.avatarSVG.faceMask}
                  faceMaskColor={user.avatarSVG.faceMaskColor}
                  facialHair={user.avatarSVG.facialHair}
                  graphic={user.avatarSVG.graphic}
                  hair={user.avatarSVG.hair}
                  hairColor={user.avatarSVG.hairColor}
                  hat={user.avatarSVG.hat}
                  hatColor={user.avatarSVG.hatColor}
                  lashes={user.avatarSVG.lashes}
                  lipColor={user.avatarSVG.lipColor}
                  mask={user.avatarSVG.mask}
                  mouth={user.avatarSVG.mouth}
                  skinTone={user.avatarSVG.skinTone}
                />
              </Box>

              {/* <BoxAvatar>
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={200}
                  height={200}
                />
              </BoxAvatar> */}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default memo(YourSelf);
