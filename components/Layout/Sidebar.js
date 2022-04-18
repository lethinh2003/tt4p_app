import { Box, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { signOut } from "next-auth/react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaMicrophone } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useEffect, useRef, useState } from "react";
import Setting from "../Homepage/Setting";
import Footer from "./Footer";
const Sidebar = ({ setDarkMore }) => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const router = useRouter();
  const ItemWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.sidebar.background.default,
    alignItems: "center",
    zIndex: 97,
    width: "90px",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transform: "translateX(0)",
    borderRight: `1px solid ${theme.palette.sidebar.border}`,

    "& .ms-sidebar__wrapper": {
      padding: "0 5px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    "& .ms-navbar": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",

      "&__item": {
        transition: "all 0.2s linear",
        width: "80px",
        height: "80px",
        fontWeight: "bold",
        cursor: "pointer",
        color: theme.palette.sidebar.normalIcon,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        opacity: 0.85,
        "&.active": {
          color: theme.palette.sidebar.activeIcon,
          position: "relative",
          "&::before": {
            content: `""`,
            right: "-5px",
            backgroundColor: theme.palette.sidebar.activeIcon,
            width: "2px",
            position: "absolute",

            height: "100%",
          },
        },
        "&--icon": {
          fontSize: "37px",
          width: "42px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  }));
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "red",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "red",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  const handleClickSwitch = () => {};
  const theme = useTheme();

  return (
    <>
      {isOpenSetting && (
        <Setting
          setDarkMore={setDarkMore}
          isOpenSetting={isOpenSetting}
          setIsOpenSetting={setIsOpenSetting}
        />
      )}
      <ItemWrapper
        className="ms-sidebar"
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <div className="ms-sidebar__wrapper">
          <div className="ms-navbar">
            <div className="ms-navbar__item">
              <Link href="/">
                <img
                  src="https://i.imgur.com/U0BdIic.png"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </Link>
            </div>

            <Link href="/">
              <div
                className={
                  router.pathname === "/"
                    ? "ms-navbar__item active"
                    : "ms-navbar__item"
                }
              >
                <span className="ms-navbar__item--icon">
                  <MessageOutlinedIcon />
                </span>
              </div>
            </Link>

            <div
              onClick={() => setIsOpenSetting(true)}
              className={
                router.pathname === "/settings"
                  ? "ms-navbar__item active"
                  : "ms-navbar__item"
              }
            >
              <span className="ms-navbar__item--icon">
                <SettingsOutlinedIcon />
              </span>
            </div>

            <div
              onClick={() => signOut()}
              className={
                router.pathname === "/sign-out"
                  ? "ms-navbar__item active"
                  : "ms-navbar__item"
              }
            >
              <span className="ms-navbar__item--icon">
                <LogoutOutlinedIcon />
              </span>
            </div>
          </div>
        </div>
      </ItemWrapper>
      <Footer setIsOpenSetting={setIsOpenSetting} />
    </>
  );
};
export default Sidebar;
