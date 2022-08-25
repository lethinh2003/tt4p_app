import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import { ChromePicker, CirclePicker } from "react-color";
const CreateColorTitle = ({
  title,
  backgroundColorTitle,
  setBackgroundColorTitle,
}) => {
  const [isOpenMenuColorPicker, setIsOpenMenuColorPicker] = useState(false);

  const LabelInput = styled(Typography)(({ theme }) => ({
    fontWeight: "500",
    opacity: "0.7",
    color: theme.palette.text.color.first,
  }));
  const handleChangeBackgroundColorTitle = (color) => {
    setBackgroundColorTitle(color.hex);
  };
  return (
    <>
      <LabelInput>Chọn màu nền tiêu đề</LabelInput>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <CirclePicker
          color={backgroundColorTitle}
          onChangeComplete={handleChangeBackgroundColorTitle}
        />
        <Button
          onClick={() => setIsOpenMenuColorPicker(!isOpenMenuColorPicker)}
          sx={{
            maxWidth: "100px",
          }}
        >
          {isOpenMenuColorPicker ? "Đóng" : "Thêm"}
        </Button>
        {isOpenMenuColorPicker && (
          <ChromePicker
            color={backgroundColorTitle}
            onChangeComplete={handleChangeBackgroundColorTitle}
          />
        )}
        <Box
          sx={{
            textAlign: "center",
            cursor: "pointer",
            overflowWrap: "break-word",
            height: "250px",
            border: (theme) => `2px solid ${theme.palette.border.dialog}`,
            backgroundColor: backgroundColorTitle
              ? backgroundColorTitle
              : "#ccc",
            borderRadius: "30px",

            fontSize: "3rem",
            color: "#ffffff",

            fontWeight: "bold",
            padding: "20px",

            "&:hover": {
              border: (theme) =>
                `2px solid ${theme.palette.border.dialogHover}`,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Box>{title ? title : "Nhập tiêu đề..."}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default memo(CreateColorTitle);
