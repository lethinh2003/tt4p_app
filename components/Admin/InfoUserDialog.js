import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import convertTime from "../../utils/convertTime";
import ItemSex from "../Dialog/InforEditSex";
import BannedEdit from "./BannedEdit";
const InfoUserDialog = ({ isShow, toggle, user }) => {
  const DialogWrapper = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.background.dialog,
      borderRadius: "20px",
      border: `1px solid ${theme.palette.border.dialog}`,
      width: "100%",
      margin: "0",
      maxWidth: "600px",

      "& .MuiDialogTitle-root": {
        borderBottom: `1px solid ${theme.palette.border.dialog}`,
        fontSize: "20px",
        fontWeight: "bold",
      },
      "& .MuiDialogContent-root": {
        padding: "20px",
      },
      "& .MuiDialogContentText-root": {
        fontWeight: "bold",
      },
    },
  }));
  const BoxAvatar = styled(Box)(({ theme }) => ({
    marginBottom: "10px",
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    maxWidth: "100px",
    fontWeight: "bold",
    height: "100px",
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
  const sexOption = [
    {
      key: "boy",
      img: "https://i.imgur.com/8buEDaI.png",
    },
    {
      key: "girl",
      img: "https://i.imgur.com/KbX5wJu.png",
    },
    {
      key: "lgbt",
      img: "https://i.imgur.com/RbjB6LH.png",
    },
  ];

  return (
    <>
      <DialogWrapper fullWidth open={isShow} onClose={toggle}>
        {user && (
          <>
            <DialogTitle>Thông tin {user.account}</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <BoxAvatar>
                  <Image
                    src={
                      user.sex === "boy"
                        ? "https://i.imgur.com/yFYUbLZ.png"
                        : "https://i.imgur.com/Or9WeCe.png"
                    }
                    width={100}
                    height={100}
                  />
                </BoxAvatar>
              </Box>
              <DialogContentText>Họ tên</DialogContentText>
              <TextField
                size="small"
                fullWidth
                defaultValue={user.name}
                disabled
              />
              <DialogContentText>Năm sinh</DialogContentText>
              <TextField
                size="small"
                fullWidth
                defaultValue={user.date}
                disabled
              />
              <DialogContentText>Đang sống ở</DialogContentText>
              <TextField
                size="small"
                fullWidth
                defaultValue={user.city}
                disabled
              />
              <DialogContentText>Giới tính</DialogContentText>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {sexOption &&
                  sexOption.map((item, i) => (
                    <ItemSex
                      isSelected={user.sex == item.key}
                      key={i}
                      item={item}
                    />
                  ))}
              </Box>
              <DialogContentText>Tham gia lúc</DialogContentText>
              <TextField
                size="small"
                fullWidth
                defaultValue={convertTime(user.createdAt)}
                disabled
              />
              <BannedEdit user={user} toggle={toggle} />
            </DialogContent>
          </>
        )}
      </DialogWrapper>
    </>
  );
};
export default InfoUserDialog;
