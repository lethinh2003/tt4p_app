import {
  Box,
  Typography,
  Switch,
  ClickAwayListener,
  Popover,
} from "@mui/material";
import { ImEye } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { _darkMode } from "../../redux/actions/_darkMode";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SET_DARKMODE } from "../../redux/actions/constants";

const MenuMobile = ({ setIsOpenMenu, isOpenMenu }) => {
  const { data: session, status } = useSession();
  const dataUser = useSelector((state) => state.user.data);

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.on);

  const [anchorEl, setAnchorEl] = useState(isOpenMenu);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpenMenu(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      {dataUser && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0, right: 0, bottom: 0 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
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
        </Popover>
      )}
    </>
  );
};
export default MenuMobile;
