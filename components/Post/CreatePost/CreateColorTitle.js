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

  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  const handleChangeBackgroundColorTitle = (color) => {
    setBackgroundColorTitle(color.hex);
  };
  console.log("render color title");
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
          // whileHover={{ scale: 1.02 }}
          sx={{
            textAlign: "center",
            cursor: "pointer",
            overflowWrap: "break-word",
            height: "250px",
            border: (theme) => `3px solid ${theme.palette.border.feeds}`,
            backgroundColor: backgroundColorTitle
              ? backgroundColorTitle
              : "#ccc",
            borderRadius: "30px",

            boxShadow: (theme) =>
              `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,

            fontSize: "3rem",
            color: "#ffffff",

            fontWeight: "bold",
            padding: "20px",
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
