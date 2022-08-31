import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo } from "react";
import LatestPost from "../MenuRight/LatestPost";
import OptionMenu from "../MenuRight/OptionMenu";
import SuggestFriends from "../MenuRight/SuggestFriends";
const MenuRight = () => {
  const ItemWrapper = styled(Box)(({ theme }) => ({
    borderLeft: `1px solid ${theme.palette.border.dialog}`,
    backgroundColor: theme.palette.sidebar.background.default,
    right: 0,
    bottom: 0,
    padding: "20px 5px",
    alignItems: "center",
    position: "fixed",
    zIndex: 97,
    width: "400px",

    display: "flex",
    flexDirection: "column",
    height: "100%",
    transform: "translateX(0)",

    "& .ms-sidebar__wrapper": {
      padding: "0 0px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      overflowY: "auto",
      "::-webkit-scrollbar": {
        display: "block",
      },
    },

    "&:hover .ms-sidebar__wrapper": {
      "::-webkit-scrollbar": {
        display: "block",
      },
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
          paddingTop: { md: "80px", lg: "20px" },
          paddingBottom: { md: "130px", lg: "20px" },
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
    </>
  );
};
export default memo(MenuRight);
