import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuggestFriends from "../MenuRight/SuggestFriends";
import BottomMenu from "./BottomMenu";
import LatestPost from "../MenuRight/LatestPost";
import OptionMenu from "../MenuRight/OptionMenu";
const MenuRight = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const isOpenSetting = useSelector((state) => state.toggleSetting.on);
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setValue("home");
    }
  }, [router.pathname]);
  const BoxNav = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "50px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "20px",
    transition: "all 0.2s linear",
    "& .title": {
      fontSize: "1.7rem",
      fontWeight: "bold",
      color: "#98a1b5",
      "&.active": {
        color: "inherit",
      },
    },

    "& .icon": {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#98a1b5",
      "&.active": {
        color: "#a974ff",
      },
    },
    "&.box": {
      "&.active": {
        boxShadow: "1px 7px 11px 0px #cccccc82",
      },
    },
    "&:hover": {
      boxShadow: "1px 7px 11px 0px #cccccc82",
    },
  }));
  const ItemWrapper = styled(Box)(({ theme }) => ({
    right: 0,
    alignItems: "center",
    zIndex: 97,
    width: "400px",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transform: "translateX(0)",
    overflowY: "auto",

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
      padding: "0px 20px",

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
            <OptionMenu />
            <SuggestFriends />
            <LatestPost />
          </div>
        </div>
      </ItemWrapper>
      <BottomMenu />
    </>
  );
};
export default MenuRight;
