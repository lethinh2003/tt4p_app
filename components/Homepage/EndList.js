import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
const EndList = ({ msg }) => {
  return (
    <>
      <Box
        as={motion.div}
        initial={{
          opacity: "0",
        }}
        animate={{
          opacity: "1",
        }}
        exit={{ opacity: 0 }}
        sx={{
          backgroundColor: "#374151",
          padding: "15px",
          fontSize: "2rem",
          borderRadius: "10px",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        {msg}
      </Box>
    </>
  );
};
export default memo(EndList);
