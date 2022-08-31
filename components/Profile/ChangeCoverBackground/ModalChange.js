import { Box, Typography } from "@mui/material";
import React from "react";
import Modal from "../../Modal/Modal";
import Color from "./Color";
const ModalChange = ({ account, isOpenModal, setIsOpenModal }) => {
  return (
    <>
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          title={"Cập nhật màu nền"}
        >
          <Box
            sx={{
              border: (theme) => `1px solid ${theme.palette.border.dialog}`,
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
              borderRadius: "5px",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                alignSelf: "center",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              Chọn lựa một màu nền trang cá nhân bạn yêu thích và sau đó nhấn
              Save!
            </Typography>
            <Color account={account} setIsOpenModal={setIsOpenModal} />
          </Box>
        </Modal>
      )}
    </>
  );
};
export default ModalChange;
