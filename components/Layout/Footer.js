import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

const Footer = ({ setIsOpenSetting }) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (event, newValue) => {
    if (newValue === "home") {
    } else if (newValue === "setting") {
      setIsOpenSetting(true);
    } else if (newValue === "signout") {
      signOut();
    }
    setValue(newValue);
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
  const BottomNavigationComponent = styled(BottomNavigation)(({ theme }) => ({
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
  const BottomNavigationActionComponent = styled(BottomNavigationAction)(
    ({ theme }) => ({
      fontSize: "40px",

      "&.Mui-selected": {
        color: theme.palette.mode === "light" ? "#0e1217" : "#ffffff",

        backgroundColor: theme.palette.mode === "dark" ? "#20262d" : "#eaebec",
        borderRadius: "20px",
        position: "relative",

        "&::before": {
          position: "absolute",
          content: `""`,
          top: 0,
          backgroundColor:
            theme.palette.mode === "dark" ? "#ffffff" : "#20262d",
          width: "50%",
          height: "2px",
        },
      },
      "&:hover": {
        backgroundColor: theme.palette.mode === "dark" ? "#20262d" : "#eaebec",
        borderRadius: "20px",
      },
    })
  );
  return (
    <>
      <BottomNavigationComponent
        sx={{
          display: { xs: "flex", md: "none" },
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationActionComponent
          value="home"
          icon={<MessageOutlinedIcon />}
        />

        <BottomNavigationActionComponent
          value="setting"
          icon={<SettingsOutlinedIcon />}
        />

        <BottomNavigationActionComponent
          value="signout"
          icon={<LogoutOutlinedIcon />}
        />
      </BottomNavigationComponent>
    </>
  );
};
export default Footer;
