import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { BigHead } from "@bigheads/core";

const OptionChat = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <Link href="/chat/random">
          <Box
            sx={{
              cursor: "pointer",
              width: "100%",
              border: (theme) => `2px solid ${theme.palette.border.dialog}`,

              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",

              padding: "20px",
              gap: "20px",
              "&:hover": {
                border: (theme) =>
                  `2px solid ${theme.palette.border.dialogHover}`,
              },
            }}
          >
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#ccf1fa",
                border: (theme) => `1px solid ${theme.palette.border.feeds}`,
              }}
            >
              <BigHead />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                Phòng Random
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                Bạn sẽ được ghép đôi ngẫu nhiên với bất kì ai
              </Typography>
            </Box>
          </Box>
        </Link>
        {/* <Link href="/chat/random-vip">
          <Box
            as={motion.div}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              cursor: "pointer",
              width: "100%",
              border: (theme) => `3px solid ${theme.palette.border.feeds}`,
              backgroundColor: "#f5f9ff",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",

              padding: "10px",
              gap: "20px",
              boxShadow: (theme) =>
                `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
            }}
          >
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#ccf1fa",
                border: (theme) => `1px solid ${theme.palette.border.feeds}`,
              }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                Phòng Random Vip
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                Bạn sẽ được ghép đôi ngẫu nhiên với bất kì ai phù hợp với yêu
                cầu của bạn
              </Typography>
            </Box>
          </Box>
        </Link> */}
      </Box>
    </>
  );
};
export default OptionChat;
