import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
const Loading = ({ item }) => {
  const dataUser = useSelector((state) => state.user.data);

  const timeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  return (
    <>
      <Box
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
          gap: "5px",
          width: "100%",
          display: "flex",
          fontSize: "3rem",
          color: "#ffffff",

          alignItems: "flex-start",
          fontWeight: "bold",
          padding: "20px 0px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "100%",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              height={40}
              width={40}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                <Skeleton animation="wave" width={100} height={20} />
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                <Skeleton animation="wave" width={70} height={20} />
              </Typography>
            </Box>
          </Box>
          <Box sx={{ color: (theme) => theme.palette.text.color.second }}>
            <Skeleton animation="wave" width={50} height={30} />
          </Box>
        </Box>
        <Box
          sx={{
            color: "#757474",
            fontSize: "1.7rem",
            fontWeight: 500,
          }}
        >
          <Skeleton animation="wave" width={150} height={20} />
        </Box>
        <Box
          sx={{
            fontSize: "1.7rem",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            color: (theme) => theme.palette.text.color.second,
          }}
        >
          <Skeleton animation="wave" width={50} height={30} />
          <Skeleton animation="wave" width={50} height={30} />
          <Box
            sx={{
              color: "#757474",
              fontSize: "1.5rem",
              fontWeight: 500,
            }}
          >
            <Skeleton animation="wave" width={100} height={30} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Loading;
