import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

const UsersInRoom = ({ socket }) => {
  const [dataUserWaiting, setDataUserWaiting] = useState({
    boy: 0,
    girl: 0,
    lgbt: 0,
  });
  useEffect(() => {
    if (socket) {
      socketInitializer();
    }
    return () => {
      if (socket) {
        socket.off("update-users-waiting-room");
      }
    };
  }, [socket]);
  const socketInitializer = () => {
    socket.on("update-users-waiting-room", (data) => {
      setDataUserWaiting((prev) => ({
        ...prev,
        boy: data.boy,
        girl: data.girl,
        lgbt: data.lgbt,
      }));
    });
  };
  const { boy, girl, lgbt } = dataUserWaiting;
  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
  return (
    <>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Hiện đang có {boy} bạn nam, {girl} bạn nữ, {lgbt} bạn LGBT đang trong
        phòng chờ random vip.
      </Typography>
      {/* <Box
        sx={{
          border: "2px solid",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Kích hoạt tài khoản
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderBottom: "2px solid",
            paddingBottom: "10px",
          }}
        >
          <Typography>
            Xin chào name, lời đầu tiên chúng tôi xin cảm ơn bạn đã tham gia vào
            cộng đồng của chúng tôi!
          </Typography>
          <Typography>
            <b>Trò chuyện bốn phương</b> là ứng dụng web mà chúng tôi gây dựng
            nên để giúp các bạn tìm bạn tâm sự. Cuộc sống này đôi khi quá áp
            lực, đừng stress, hãy lên <b>Trò chuyện bốn phương</b> để tìm người
            tâm sự ngay. Chúng tôi cam kết bạn sẽ bớt phần nào stress cuộc sống
            khi tham gia chat với người lạ!
          </Typography>
          <Typography>
            Để kích hoạt tài khoản, vui lòng click vào nút dưới đây:
          </Typography>
          <Button
            sx={{
              alignSelf: "center",
            }}
          >
            Kích hoạt
          </Button>
        </Box>

        <Typography
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Thông tin liên hệ
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>Author: Le Thinh</Typography>
          <Typography>Email: lethinh.developer@gmail.com</Typography>
        </Box>
      </Box> */}
    </>
  );
};
export default UsersInRoom;
