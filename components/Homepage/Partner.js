import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";

const Partner = ({
  isInRoom,
  setIsWaitingRoom,
  setIsInRoom,
  partner,
  user,
  socket,
}) => {
  const handleClickOutChatRoom = async () => {
    await socket.emit("out-chat-room", partner);
    setIsWaitingRoom(false);
    setIsInRoom(false);
  };

  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
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

  const BoxLoading = styled(Box)({
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "black",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
  const LoadingContent = styled(Typography)({
    fontWeight: "700",
    opacity: "0.7",
  });

  return (
    <>
      <Typography
        as={motion.div}
        initial={{ opacity: 0 }}
        transition={{
          duration: 1,
        }}
        animate={{ opacity: 1 }}
        sx={{
          fontWeight: "bold",
          fontSize: "35px",
          alignSelf: "center",
        }}
      >
        Khu vực tâm sự
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "20px", sm: "0" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              alignSelf: "center",
              maxWidth: "200px",
            }}
            className="three-dots"
          >
            {user.name}
          </Typography>

          <BoxAvatar
            as={motion.div}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
          >
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

        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            width: "50px",
            height: "50px",
          }}
        >
          <img
            src="https://i.imgur.com/cYuOjCa.png"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              alignSelf: "center",
              maxWidth: "200px",
            }}
            className="three-dots"
          >
            {partner.name}
          </Typography>

          <BoxAvatar
            as={motion.div}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Image
              src={
                partner.sex === "boy"
                  ? "https://i.imgur.com/yFYUbLZ.png"
                  : "https://i.imgur.com/Or9WeCe.png"
              }
              alt={partner.name}
              width={200}
              height={200}
            />
          </BoxAvatar>
        </Box>
      </Box>

      <ButtonSocialWrapper
        as={motion.div}
        whileHover={{ scale: 1.02 }}
        type="submit"
        onClick={() => handleClickOutChatRoom()}
      >
        Thoát chat!!
      </ButtonSocialWrapper>
    </>
  );
};
export default Partner;
