import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillHome, AiFillMessage, AiTwotoneSetting } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Account from "../Sidebar/Account";
import BottomMenu from "./BottomMenu";
import { motion } from "framer-motion";

const Sidebar = () => {
  const router = useRouter();
  const getRouterValue = () => {
    let result;
    if (router.pathname.startsWith("/posts") || router.pathname === "/") {
      result = "home";
    } else if (router.pathname.startsWith("/chat")) {
      result = "message";
    }
    return result;
  };
  const [value, setValue] = useState(getRouterValue());

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));
  const BoxNav = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    width: "100%",
    height: "50px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "40px",
    transition: "all 0.2s linear",
    "& .title": {
      fontSize: "1.7rem",
      fontWeight: "bold",
      color: theme.palette.text.color.second,
      "&.active": {
        color: theme.palette.text.color.first,
      },
    },

    "& .icon": {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: theme.palette.text.color.second,
      "&.active": {
        color: theme.palette.text.color.active,
      },
    },
    "&.box": {
      "&.active": {
        boxShadow: "1px 7px 11px 0px #ebeef982",
      },
    },
    "&:hover": {
      boxShadow: "1px 7px 11px 0px #ebeef982",
    },
  }));
  const ItemWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.sidebar.background.default,
    alignItems: "center",
    zIndex: 97,
    width: "280px",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transform: "translateX(0)",

    boxShadow: `2px 2px 9px 0px ${theme.palette.sidebar.boxShadow}`,
    "& .ms-sidebar__wrapper": {
      padding: "0 0px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    "& .ms-navbar": {
      display: "flex",
      flexDirection: "column",
      gap: "20px",

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
          // backgroundColor: theme.palette.background.menuItemHover,
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

  const SidebarMenu = [
    {
      title: "Home",
      value: "home",
      link: "/",
      icon: <AiFillHome />,
    },
    {
      title: "Message",
      value: "message",
      link: "/chat",
      icon: <AiFillMessage />,
    },
    {
      title: "Profile",
      value: "profile",
      link: "/profile",
      icon: <AccountBoxIcon />,
    },
    {
      title: "Settings",
      value: "settings",
      link: "/settings",
      icon: <AiTwotoneSetting />,
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
            <div
              className="ms-navbar__item"
              style={{
                width: "100%",
              }}
            >
              <img
                src="https://i.imgur.com/A0OAtU5.png"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "80px",
                }}
              />
            </div>
            <Box>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  paddingLeft: "40px",
                  paddingBottom: "20px",
                }}
              >
                Menu
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {SidebarMenu.map((item, i) => (
                  <Link href={item.link} key={i}>
                    <BoxNav
                      as={motion.div}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.9 }}
                      className={value === item.value ? "box active" : "box"}
                    >
                      <div
                        className={
                          value === item.value ? "icon active" : "icon"
                        }
                      >
                        {item.icon}
                      </div>
                      <Typography
                        className={
                          value === item.value ? "title active" : "title"
                        }
                      >
                        {item.title}
                      </Typography>
                    </BoxNav>
                  </Link>
                ))}
              </Box>
            </Box>
            <Account />

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
