import { Typography, Box, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import convertToTime from "../../utils/convertTime";
import readingTime from "reading-time";
import { BiTimeFive } from "react-icons/bi";
import { BsHandThumbsUp } from "react-icons/bs";
import ItemHearts from "../Feeds/ItemHearts";
import { AiFillMessage } from "react-icons/ai";

const FeaturesPost = (props) => {
  const { item } = props;

  return (
    <>
      {item && (
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
                height: "50px",
                color: (theme) => theme.palette.text.color.first,
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <BsHandThumbsUp />
              Interaction
            </Typography>
            <Box
              as={motion.div}
              sx={{
                cursor: "pointer",
                height: "250px",
                overflowY: "auto",
                border: (theme) => `3px solid ${theme.palette.border.feeds}`,
                maxWidth: "400px",
                borderRadius: "10px",
                width: "100%",
                boxShadow: (theme) =>
                  `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
                display: "flex",
                fontSize: "3rem",
                color: "#a4b6e1",

                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                gap: "20px",
                padding: "20px",
                flexDirection: "column",
              }}
            >
              <ItemHearts item={item} />
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <AiFillMessage
                  style={{
                    fontSize: "3rem",
                  }}
                />
                {item.comments.length}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default FeaturesPost;
