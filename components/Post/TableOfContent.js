import { Typography, Box, Avatar, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import convertToTime from "../../utils/convertTime";
import readingTime from "reading-time";
import { BiTimeFive } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";

const TableOfContent = (props) => {
  const { item } = props;
  const [listContents, setListContents] = useState([]);
  const [isContentPos, setIsContentPos] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = [];
    const getH1elements = document.querySelectorAll(".content-html h1");
    if (getH1elements.length > 0) {
      for (let i = 0; i < getH1elements.length; i++) {
        data.push(getH1elements[i]);
      }
    }
    setIsLoading(false);

    setListContents(data);
  }, []);

  const handleClickContent = (item) => {
    item.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

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
      {isLoading && (
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
              <Skeleton
                animation="wave"
                variant="text"
                height={"20px"}
                width={"100px"}
              />
            </Typography>
            <Box
              sx={{
                cursor: "pointer",

                overflowY: "auto",
                border: (theme) => `3px solid ${theme.palette.border.feeds}`,
                maxWidth: "400px",
                width: "100%",
                borderRadius: "10px",

                boxShadow: (theme) =>
                  `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
                display: "flex",
                fontSize: "3rem",
                color: "#ffffff",

                alignItems: "center",
                fontWeight: "bold",

                flexDirection: "column",
                gap: "5px",
                padding: "20px",
              }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                height={"30px"}
                width={"100%"}
              />
              <Skeleton
                animation="wave"
                variant="text"
                height={"30px"}
                width={"100%"}
              />
              <Skeleton
                animation="wave"
                variant="text"
                height={"30px"}
                width={"100%"}
              />
            </Box>
          </Box>
        </>
      )}
      {item && listContents.length > 0 && (
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
              <BsListStars />
              Table of Contents
            </Typography>
            <Box
              as={motion.div}
              sx={{
                cursor: "pointer",
                height: "250px",
                overflowY: "auto",
                border: (theme) => `3px solid ${theme.palette.border.feeds}`,
                maxWidth: "400px",
                width: "100%",
                borderRadius: "10px",

                boxShadow: (theme) =>
                  `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
                display: "flex",
                fontSize: "3rem",
                color: "#ffffff",

                alignItems: "flex-start",
                fontWeight: "bold",
                padding: "20px",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {listContents.length > 0 &&
                listContents.map((item, i) => (
                  <BoxTitleItem
                    as={motion.div}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={i}
                    onClick={() => handleClickContent(item)}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                      }}
                      className={
                        item.innerText === isContentPos
                          ? "table_content active"
                          : "table_content"
                      }
                    >
                      {item.innerText}
                    </Typography>
                  </BoxTitleItem>
                ))}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default TableOfContent;
