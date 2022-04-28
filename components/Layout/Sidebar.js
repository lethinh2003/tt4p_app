import { useTheme } from "@emotion/react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Box, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Setting from "../Homepage/Setting";
import BottomMenu from "./BottomMenu";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getToggleSetting } from "../../redux/actions/getToggleSetting";
import { useEffect } from "react";
const Sidebar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const isOpenSetting = useSelector((state) => state.toggleSetting.on);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    if (router.pathname === "/") {
      setValue("home");
    }
  }, [router.pathname]);
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
        fontSize: "2rem",
        position: "relative",
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
        },
        "&:hover": {
          backgroundColor: theme.palette.background.menuItemHover,
        },
        "&--icon": {
          width: "1em",
          height: "1em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  }));

  const handleClickItem = (value, link) => {
    setValue(value);
    if (value === "signout") {
      signOut();
    }
    if (value === "setting") {
      dispatch(getToggleSetting(true));
    }
  };
  const SidebarMenu = [
    {
      value: "home",
      link: "/",
      icon: <MessageOutlinedIcon />,
    },
    {
      value: "setting",

      icon: <SettingsOutlinedIcon />,
    },
    {
      value: "signout",
      icon: <LogoutOutlinedIcon />,
    },
  ];
  return (
    <>
      <ItemWrapper
        className="ms-sidebar"
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <div className="ms-sidebar__wrapper">
          <div className="ms-navbar">
            <div className="ms-navbar__item">
              <img
                src="https://i.imgur.com/U0BdIic.png"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </div>
            {SidebarMenu.map((item, i) => (
              <div
                key={i}
                onClick={() => handleClickItem(item.value, item.link)}
                className={
                  router.pathname === item.link
                    ? "ms-navbar__item active"
                    : "ms-navbar__item"
                }
              >
                <span className="ms-navbar__item--icon">{item.icon}</span>
                {/* {item.value === value ? (
                  <motion.div
                    className="border-sidebar"
                    layoutId="border-sidebar"
                  ></motion.div>
                ) : null} */}
              </div>
            ))}

            {/* <div
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
            </div> */}
          </div>
        </div>
      </ItemWrapper>
      <BottomMenu />
    </>
  );
};
export default Sidebar;
