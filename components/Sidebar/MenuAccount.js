import { Box, Typography, Switch, ClickAwayListener } from "@mui/material";
import { ImEye } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { styled } from "@mui/material/styles";
import Link from "next/link";
const MenuAccount = ({ setIsOpenMenuOptions, session }) => {
  const MenuItem = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    color: theme.palette.text.color.first,
    minHeight: "50px",

    "&:hover": {
      backgroundColor: "#e8ecf9",
    },
  }));
  return (
    <>
      <ClickAwayListener onClickAway={() => setIsOpenMenuOptions(false)}>
        <Box
          sx={{
            position: "absolute",

            backgroundColor: "#ffffff",
            transform: "translateX(103%)",
            top: 0,
            height: "320px",
            boxShadow: (theme) => `1px 1px 15px 0px #eaebecab`,
            width: "100%",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.border.dialog}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: (theme) => theme.palette.text.color.second,
                minHeight: "50px",
              }}
            >
              <ImEye
                style={{
                  fontSize: "2.4rem",
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                View Options
              </Typography>
            </Box>
            <MenuItem>
              <Typography
                sx={{
                  paddingLeft: "35px",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                Dark Mode
              </Typography>
              <Switch />
            </MenuItem>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.border.dialog}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: (theme) => theme.palette.text.color.second,
                minHeight: "50px",
              }}
            >
              <CgProfile
                style={{
                  fontSize: "2.4rem",
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                My Stuff
              </Typography>
            </Box>
            <MenuItem>
              <Link href={`/profile/${session.user.account}`}>
                <Typography
                  sx={{
                    paddingLeft: "35px",
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                  }}
                >
                  Profile
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Typography
                sx={{
                  paddingLeft: "35px",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                Settings
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography
                sx={{
                  paddingLeft: "35px",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                Log out
              </Typography>
            </MenuItem>
          </Box>
        </Box>
      </ClickAwayListener>
    </>
  );
};
export default MenuAccount;
