import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToggleSetting } from "../../redux/actions/getToggleSetting";
import { getToggleAboutMe } from "../../redux/actions/getToggleAboutMe";
import { toast } from "react-toastify";

const Footer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);

  const handleClickItem = (value) => {
    if (value === "home") {
    } else if (value === "setting") {
      if (getToggleStatusBanned) {
        toast.error("Tài khoản bạn đang bị cấm, chức năng tạm khoá!");
      } else {
        dispatch(getToggleSetting(true));
      }
    } else if (value === "signout") {
      if (getToggleStatusBanned) {
        toast.error("Tài khoản bạn đang bị cấm, chức năng tạm khoá!");
      } else {
        signOut();
      }
    } else if (value === "about-me") {
      dispatch(getToggleAboutMe(true));
    }
    setValue(value);
  };
  useEffect(() => {
    if (router.pathname === "/") {
      setValue("home");
    }
  }, [router.pathname]);
  const SocialButton = styled(Button)({
    minWidth: "50px",
    height: "50px",
    backgroundColor: "#222326",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    color: "#fff",

    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#222326",
      borderColor: "#005cbf",
    },

    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  const BottomNavigationComponent = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.sidebar.border}`,

    padding: "5px 20px",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.palette.header.background.default,
    height: "70px",
    zIndex: 1002,
    gap: "10px",
    borderTop:
      theme.palette.mode === "light"
        ? "1px solid #dcdee0"
        : "1px solid #4b4c4e",
  }));
  const BottomNavigationActionComponent = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "relative",
    backgroundColor: theme.palette.background.menuItem,
    color: theme.palette.mode === "light" ? "#0e1217" : "#ffffff",
    borderRadius: "20px",

    height: "100%",
    width: "calc(100% / 3)",

    "&:hover": {
      backgroundColor: theme.palette.background.menuItemHover,
      borderRadius: "20px",
    },
  }));
  const BottomMenu = [
    // {
    //   value: "home",
    //   icon: (
    //     <MessageOutlinedIcon
    //       sx={{
    //         fontSize: "2rem",
    //       }}
    //     />
    //   ),
    // },
    {
      value: "about-me",
      icon: (
        <InfoOutlinedIcon
          sx={{
            fontSize: "2rem",
          }}
        />
      ),
    },
    {
      value: "setting",
      icon: (
        <SettingsOutlinedIcon
          sx={{
            fontSize: "2rem",
          }}
        />
      ),
    },
    {
      value: "signout",
      icon: (
        <LogoutOutlinedIcon
          sx={{
            fontSize: "2rem",
          }}
        />
      ),
    },
  ];
  return (
    <>
      <BottomNavigationComponent
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
        {BottomMenu.map((item, i) => (
          <BottomNavigationActionComponent
            key={i}
            value={item.value}
            onClick={() => handleClickItem(item.value)}
          >
            {item.icon}
          </BottomNavigationActionComponent>
        ))}
      </BottomNavigationComponent>
    </>
  );
};
export default Footer;