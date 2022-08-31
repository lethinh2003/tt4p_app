import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import { useRef, useEffect } from "react";
import SidebarMobile from "./SidebarMobile";
const Layout = (props) => {
  const hihi = useRef(null);

  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(83deg, ${theme.palette.background.first} 0%, ${theme.palette.background.second} 29%, ${theme.palette.background.third} 100%)`,
    color: theme.palette.text.color.first,
    minHeight: "100vh",
    width: "100vw",
    minHeight: "-webkit-fill-available",
  }));
  const ContainerBoxWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.box.background.default,

    height: "100%",
    minHeight: "100vh",
  }));
  const ContainerBoxRightWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.box.background.default,
    // height: "600px",
    width: "calc(100% - 90px)",
    height: "100%",
    position: "absolute",
    left: "90px",
    padding: "20px 10px",
  }));
  const BoxWrapper = styled(Box)(({ theme }) => ({
    height: "calc(100% - 70px)",
    width: "100%",
    paddingRight: "400px",

    display: "flex",

    gap: "20px",
    overflow: "auto",
  }));

  return (
    <>
      <ContainerBoxWrapper>
        <Sidebar />

        <SidebarMobile />
        <Box
          sx={{
            marginTop: { xs: "60px", md: 0 },
          }}
        >
          {props.children}
        </Box>
      </ContainerBoxWrapper>
    </>
  );
};
export default Layout;
