import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { BsListStars } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Image from "next/image";

const Partner = ({}) => {
  const partner = useSelector((state) => state.partner);
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
      {partner && (
        <Box
          sx={{
            padding: "30px 0px",

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
            {partner.sex === "boy" ? "👨🏻" : "👩🏻"} Thông tin đối phương
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
            <Box
              sx={{
                width: "100px",
                height: "100px",

                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
                border: "2px solid #23303a",
                boxShadow: "0px 3px 15px 0px #23303a",
              }}
            >
              <Image
                src={partner.avatar}
                alt={partner.name}
                objectFit="cover"
                layout="fill"
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                {partner.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                @{partner.account}
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
                boxShadow: (theme) =>
                  `0px 3px 20px 1px ${theme.palette.feeds.boxShadow}`,
                backgroundColor: "#ccf1fa",
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
                  color: "#464e5a",
                }}
              >
                Users
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                👨🏻 {partner.partners}
              </Typography>
            </Box>
            <Box
              sx={{
                boxShadow: (theme) =>
                  `0px 3px 20px 1px ${theme.palette.feeds.boxShadow}`,
                backgroundColor: "#ccf1fa",
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
                  color: "#464e5a",
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
                💬 {partner.messages}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Partner;
