import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AiFillHome, AiFillMessage, AiTwotoneSetting } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { memo } from "react";
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
  const getRouterValue = () => {
    let result;
    if (router.pathname.startsWith("/posts") || router.pathname === "/") {
      result = "home";
    } else if (router.pathname.startsWith("/chat")) {
      result = "message";
    }
    return result;
  };
  const dispatch = useDispatch();
  const [value, setValue] = useState(getRouterValue());
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);

  const handleClickItem = (value) => {
    if (value === "home") {
      router.push("/");
    } else if (value === "message") {
      router.push("/chat");
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
  // useEffect(() => {
  //   if (router.pathname.startsWith("/posts") || router.pathname === "/") {
  //     setValue("home");
  //   } else if (router.pathname.startsWith("/chat")) {
  //     setValue("message");
  //   }
  // }, []);
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
    borderTop: `1px solid ${theme.palette.border.dialog}`,
    margin: "10px 20px",
    borderRadius: "20px",
    padding: "5px 20px",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.palette.latestPost.background.first,

    height: "90px",
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

    color: theme.palette.mode === "light" ? "#1a1f26" : "#ffffff",
    borderRadius: "20px",
    maxWidth: "calc(100% / 4)",
    width: "100%",

    height: "100%",
    fontSize: "3rem",
    "&:hover": {
      // backgroundColor: theme.palette.background.menuItemHover,
      color: "#20b8fb",
      borderRadius: "20px",
    },
  }));
  const BottomMenu = [
    {
      value: "home",
      key: "/",
      icon: <AiFillHome />,
    },
    // {
    //   value: "about-me",
    //   icon: (
    //     <InfoOutlinedIcon
    //       sx={{
    //         fontSize: "2rem",
    //       }}
    //     />
    //   ),
    // },
    // {
    //   value: "setting",
    //   icon: (
    //     <SettingsOutlinedIcon
    //       sx={{
    //         fontSize: "2rem",
    //       }}
    //     />
    //   ),
    // },
    {
      value: "message",
      key: "/chat",
      icon: <AiFillMessage />,
    },
    {
      value: "setting",
      key: "/setting",
      icon: <AiTwotoneSetting />,
    },
    {
      value: "signout",
      key: "/signout",
      icon: <FaSignOutAlt />,
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
            as={motion.div}
            sx={{
              color: value === item.value ? "#20b8fb" : null,
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
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
export default memo(Footer);
