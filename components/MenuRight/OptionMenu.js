import { Box, Switch, Typography, Avatar, Button, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiSearch } from "react-icons/fi";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreateIcon from "@mui/icons-material/Create";
import { VscAdd } from "react-icons/vsc";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import NotifyButton from "./NotifyButton";
const OptionMenu = () => {
  return (
    <>
      <Box sx={{}}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#f1f6fc",
              borderRadius: "10px",
              flex: 1,
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                border: "2px solid #e8ecf9",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FiSearch
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#98a1b5",
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",

                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                Search
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
            }}
          >
            <NotifyButton />
            <Link href="/posts/create">
              <Box
                sx={{
                  cursor: "pointer",
                  width: "50px",
                  height: "50px",

                  borderRadius: "10px",
                  display: "flex",
                  fontSize: "2.5rem",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#e8ecf9",
                  },
                }}
              >
                <VscAdd />
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default OptionMenu;
