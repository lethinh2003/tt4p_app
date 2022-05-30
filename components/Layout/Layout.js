import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import { useRef, useEffect } from "react";

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

    width: "100%",
    height: "calc(100% - 20px)",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    borderRadius: "30px",
    boxShadow: `0px 4px 6px 2px ${theme.palette.box.shadow.default}`,
    overflow: "hidden",
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

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: "20px",
    overflow: "auto",
  }));

  return (
    <>
      <ContainerWrapper>
        <ContainerBoxWrapper
          sx={{
            borderRadius: { xs: "0px", md: "30px" },
            height: { xs: "calc(100% - 0px)", md: "calc(100% - 0px)" },
          }}
        >
          <Sidebar />

          <ContainerBoxRightWrapper
            sx={{
              width: {
                xs: "100%",
                md: "calc(100% - 280px - 400px)",
              },
              left: {
                xs: "0",
                md: "280px",
              },
              right: {
                xs: "0",
                md: "400px",
              },
            }}
          >
            <BoxWrapper
              ref={hihi}
              sx={{
                height: { xs: "calc(100% - 70px)", md: "100%" },
                borderRight: (theme) => ({
                  xs: null,
                  md: `1px solid ${theme.palette.border.dialog}`,
                }),
              }}
            >
              {props.children}
            </BoxWrapper>
          </ContainerBoxRightWrapper>
        </ContainerBoxWrapper>
      </ContainerWrapper>
    </>
  );
};
export default Layout;
