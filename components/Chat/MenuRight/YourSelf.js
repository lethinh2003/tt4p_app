import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { BsListStars } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import Image from "next/image";
import { useSelector } from "react-redux";
import { BigHead } from "@bigheads/core";
import AvatarUser from "../../Homepage/AvatarUser";

const YourSelf = ({ dataUser }) => {
  const partnersCount = useSelector((state) => state._partnersCount);
  const messagesCount = useSelector((state) => state._messagesCount);
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
      {dataUser && (
        <Box
          sx={{
            paddingBottom: "30px",
            borderBottom: "1px solid #52586666",
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
            {dataUser.data.sex === "boy" ? "👨🏻" : "👩🏻"} Thông tin cá nhân
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              width: "100%",
              gap: "10px",
            }}
          >
            <AvatarUser
              user={dataUser.data}
              sx={{
                width: "100px",
                height: "100px",
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                {dataUser.data.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textAlign: "center",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                @{dataUser.data.account}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",
              alignItems: "center",

              width: "100%",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.feed.background.first,

                width: "100px",
                alignItems: "center",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                Partners
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                👨🏻{partnersCount}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.feed.background.first,
                width: "100px",
                alignItems: "center",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                Messages
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                💬 {messagesCount}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default YourSelf;
