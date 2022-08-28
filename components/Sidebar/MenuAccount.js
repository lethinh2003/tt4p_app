import { Box, Typography, Switch, ClickAwayListener } from "@mui/material";
import { ImEye } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { _darkMode } from "../../redux/actions/_darkMode";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";

import { SET_DARKMODE } from "../../redux/actions/constants";
const MenuAccount = ({ setIsOpenMenuOptions, session }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.on);
  const handleChangeTheme = (value) => {
    if (value === "dark") {
      dispatch(
        _darkMode({
          type: SET_DARKMODE,
          data: true,
        })
      );
      localStorage.setItem("darkMode", "true");
    } else {
      dispatch(
        _darkMode({
          type: SET_DARKMODE,
          data: false,
        })
      );
      localStorage.setItem("darkMode", "false");
    }
  };
  const MenuItem = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    color: theme.palette.text.color.first,
    minHeight: "50px",

    "&:hover": {
      backgroundColor: theme.palette.accountOptionMenu.background.hover,
    },
  }));
  return (
    <>
      <ClickAwayListener onClickAway={() => setIsOpenMenuOptions(false)}>
        <Box
          sx={{
            position: "absolute",

            backgroundColor: (theme) =>
              theme.palette.accountOptionMenu.background.first,
            border: (theme) => `1px solid ${theme.palette.border.dialog}`,
            transform: "translateX(103%)",
            top: 0,
            height: "320px",
            boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",
            width: "100%",
            overflowY: "auto",
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
                }}
              >
                Dark Mode
              </Typography>
              <Switch
                checked={isDarkMode}
                onClick={
                  isDarkMode
                    ? () => handleChangeTheme("light")
                    : () => handleChangeTheme("dark")
                }
              />
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
                  }}
                >
                  Profile
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={`/profile/${session.user.account}`}>
                <Typography
                  sx={{
                    paddingLeft: "35px",
                    fontSize: "1.7rem",
                  }}
                >
                  Settings
                </Typography>
              </Link>
            </MenuItem>

            <MenuItem onClick={() => signOut()}>
              <Typography
                sx={{
                  paddingLeft: "35px",
                  fontSize: "1.7rem",
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
