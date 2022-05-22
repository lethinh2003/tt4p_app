import { Typography, Box, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import convertToTime from "../../utils/convertTime";
import readingTime from "reading-time";
import { BiTimeFive } from "react-icons/bi";
import { RiBookOpenLine } from "react-icons/ri";

const ContentPost = (props) => {
  const [timeReading, setTimeReading] = useState(0);
  const { item } = props;

  return (
    <>
      {item && (
        <>
          <Box
            sx={{
              fontSize: "2rem",
            }}
          >
            <div
              className="content-html"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </Box>
        </>
      )}
    </>
  );
};
export default ContentPost;
