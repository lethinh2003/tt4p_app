import { useTheme } from "@emotion/react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { memo } from "react";
const Modal = ({
  isLoadingModal,
  setIsLoadingModal,
  isOpenModal,
  setIsOpenModal,
  children,
  title,
  maxWidth,
}) => {
  //   const { data: session, status } = useSession();
  const handleClose = () => {
    setIsOpenModal(false);
  };

  const theme = useTheme();

  const DialogWrapper = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.background.dialog,
      borderRadius: "20px",
      border: `1px solid ${theme.palette.border.dialog}`,
      width: "100%",
      margin: "0",
      // maxWidth: "calc(100vw - 40px)",

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
      <DialogWrapper
        fullWidth={true}
        maxWidth={maxWidth ? maxWidth : "md"}
        open={isOpenModal}
        onClose={handleClose}
      >
        <DialogTitle>{title ? title : "Thông báo"}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </DialogWrapper>
    </>
  );
};
export default memo(Modal);
