import { Box, Switch, Typography, Avatar, Button, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiSearch } from "react-icons/fi";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreateIcon from "@mui/icons-material/Create";
const OptionMenu = () => {
  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));
  return (
    <>
      <Box
        sx={{
          padding: "30px 0px",
        }}
      >
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
              height: "70px",
              border: (theme) =>
                `2px solid ${theme.palette.border.menuright_option}`,
              borderRadius: "20px",
              flex: 1,
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
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
            <Box
              sx={{
                width: "70px",
                height: "70px",
                border: (theme) =>
                  `2px solid ${theme.palette.border.menuright_option}`,
                borderRadius: "50%",
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#98a1b5",
                  }}
                />
              </Badge>
            </Box>
            <Box
              sx={{
                width: "70px",
                height: "70px",
                border: (theme) =>
                  `2px solid ${theme.palette.border.menuright_option}`,
                borderRadius: "50%",
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CreateIcon
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#98a1b5",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default OptionMenu;
