import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getToggleSetting } from "../../redux/actions/getToggleSetting";
import ThemeEdit from "../Dialog/ThemeEdit";
import InfoModalEdit from "../Dialog/InfoEdit";
import HideInfoEdit from "../Dialog/HideInfoEdit";
const Setting = () => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();
  const isOpenSetting = useSelector((state) => state.toggleSetting.on);
  const data = useSelector((state) => state.user.data);
  const requesting = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);
  const theme = useTheme();
  const handleClose = () => {
    dispatch(getToggleSetting(false));
  };

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

  return (
    <>
      <DialogWrapper fullWidth open={isOpenSetting} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <ThemeEdit />
          {data && data.data && <HideInfoEdit user={data.data} />}
          {data && data.data && <InfoModalEdit user={data.data} />}
        </DialogContent>
      </DialogWrapper>
    </>
  );
};
export default Setting;
