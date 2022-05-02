import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { getToggleAboutMe } from "../../redux/actions/getToggleAboutMe";
const Banned = () => {
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);

  const [isBanned, setIsBanned] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const TimeIntervalBannedAccount = useRef(null);

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
      "& .MuiDialogActions-root": {
        borderTop: `1px solid ${theme.palette.border.dialog}`,
      },
    },
  }));

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
    <DialogWrapper fullWidth open={getToggleStatusBanned}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="https://i.imgur.com/8FBVlJe.png"
            width={"100"}
            height={"100"}
          />
        </Box>
        <DialogContentText>
          Tài khoản của bạn đã bị cấm. Nếu cảm thấy đây là lỗi, hãy liên hệ với
          chúng tôi!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(getToggleAboutMe(true))}>
          Liên hệ
        </Button>
      </DialogActions>
    </DialogWrapper>
  );
};
export default Banned;
