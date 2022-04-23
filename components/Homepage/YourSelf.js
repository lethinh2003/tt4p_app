import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import useModal from "../../utils/useModal";
import InfoModal from "./InfoModal";
const YourSelf = ({ user }) => {
  const { isShow, toggle } = useModal();

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
  const handleClickAvatar = () => {
    toggle();
  };
  return (
    <>
      {user && (
        <>
          {isShow && <InfoModal isShow={isShow} toggle={toggle} user={user} />}
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

            <BoxAvatar onClick={() => handleClickAvatar()}>
              <Image
                src={
                  user.sex === "boy"
                    ? "https://i.imgur.com/yFYUbLZ.png"
                    : "https://i.imgur.com/Or9WeCe.png"
                }
                alt={user.name}
                width={200}
                height={200}
              />
            </BoxAvatar>
          </Box>
        </>
      )}
    </>
  );
};
export default YourSelf;
