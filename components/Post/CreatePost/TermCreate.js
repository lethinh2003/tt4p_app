import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { BsListStars } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { BigHead } from "@bigheads/core";

const TermCreate = () => {
  const BoxTitleItem = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "5px",
    color: theme.palette.text.color.first,
    borderRadius: "5px",
    "&:hover": {
      border: `1px solid ${theme.palette.border.dialog}`,
      color: theme.palette.text.color.active,
      boxShadow: "2px 2px 4px 0px #c3cddbab",
    },

    "& .table_content.active": {
      color: theme.palette.text.color.active,
    },
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.7rem",
            fontWeight: "bold",

            color: (theme) => theme.palette.text.color.first,
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          ⚠️ Quy định đăng bài
        </Typography>

        <Box
          as={motion.div}
          sx={{
            // height: "250px",
            overflowY: "auto",
            border: (theme) => `3px solid ${theme.palette.border.feeds}`,
            maxWidth: "400px",
            width: "100%",
            borderRadius: "10px",

            boxShadow: (theme) =>
              `0px 3px 20px 6px ${theme.palette.feeds.boxShadow}`,
            display: "flex",
            fontSize: "3rem",
            color: "#ffffff",

            alignItems: "flex-start",
            fontWeight: "bold",
            padding: "20px",
            flexDirection: "column",
            gap: "5px",
            color: (theme) => theme.palette.text.color.first,
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
            }}
          >
            1. Không được đăng bài với nội dung thô tục, khiêu dâm, chửi thề,
            bàn luận chính trị, các tệ nạn xã hội,...
          </Typography>
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
            }}
          >
            2. Mọi bài viết liên quan đến điều khoản 1 sẽ bị xóa và banned tài
            khoản vĩnh viễn.
          </Typography>
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
            }}
          >
            3. Chúng tôi không chịu trách nhiệm cho mọi hành vi vi phạm pháp
            luật của bạn.
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default TermCreate;
