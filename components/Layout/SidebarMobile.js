import { Box, useScrollTrigger, Slide, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { VscListSelection } from "react-icons/vsc";
import { motion } from "framer-motion";
import AccountMobile from "../Sidebar/AccountMobile";

function HideOnScroll(props) {
  const { children, window, threshold } = props;
  const refScroll = useRef(null);
  useEffect(() => {
    const getLayoutDom = document.querySelector(".layout");
    refScroll.current = getLayoutDom;
    console.log(refScroll.current);
  }, []);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
    target: refScroll.current ? refScroll.current : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const SidebarMobile = (props) => {
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

  const SizebarMobileItem = styled(Box)(({ theme }) => ({
    fontSize: "3rem",
    fontWeight: "bold",
    borderRadius: "5px",
    // border: `1px solid ${theme.palette.border.dialog}`,
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SizebarMobileItem
          as={motion.div}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{}}
        >
          <VscListSelection />
        </SizebarMobileItem>
        <SizebarMobileItem
          as={motion.div}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AccountMobile />
        </SizebarMobileItem>
      </Box>
    </>
  );
};
export default SidebarMobile;
