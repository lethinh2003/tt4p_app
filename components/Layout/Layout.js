import { Box } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { getDarkMode } from "../../redux/actions/getDarkMode";
import Footer from "./Footer";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.palette.background.first};
  }
  ::-webkit-scrollbar-thumb {
  background-color:  ${({ theme }) => theme.palette.iconColor.default};

  &:hover {
    background-color:  ${({ theme }) => theme.palette.iconColor.hover};
  }
}
.MuiBackdrop-root {
  background-color:${({ theme }) => theme.palette.background.overlay} ;
}
.outline {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid ${({ theme }) => theme.palette.border.dialog};
  border-radius: 10px;
}
.border-sidebar {
  
top: 0;
left: 0;
bottom: 0;
    right: 0;
    position: absolute;
    background-color: ${({ theme }) => theme.palette.background.menuItem};
    z-index: -1;
  &::before {
    content: "";
    right: -5px;
    background-color: ${({ theme }) => theme.palette.border.sidebar};
    width: 2px;
    position: absolute;
    height: 100%;
  }
}
`;

const getDesignTokens = (mode) => ({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.button.default,
          color: "#fff",
          textTransform: "capitalize",
          borderRadius: "10px",
          padding: "10px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "1.5rem",
          "&:hover": {
            backgroundColor: theme.palette.button.default,
            opacity: 0.8,
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: "100%",
          margin: "0",
          maxWidth: "600px",
        }),
      },
    },
  },
  typography: {
    fontSize: 20,

    fontFamily: [
      "Noto Sans",
      "League Spartan",
      "Bebas Neue",
      "IBM Plex Sans",
      "Poppins",
      "sans-serif",
    ].join(","),
  },
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: "#f9f7f0",
          }
        : {
            main: "#080808",
          }),
    },
    background: {
      ...(mode === "dark"
        ? {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#17191f",
            overlay: "#ffffff3d",
            buttonOption: "#575c5c73",
            buttonOptionHover: "#00000029",
            menuItem: "#20262d",
            menuItemHover: "#393e44",
          }
        : {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#edf0f7",
            overlay: "#0e12173d",
            buttonOption: "#fd6b2229",
            buttonOptionHover: "#fd6b2229",
            menuItem: "#eaebec",
            menuItemHover: "#eaebec",
          }),
    },
    header: {
      background: {
        ...(mode === "light"
          ? {
              default: "#ffffff",
            }
          : {
              default: "#0e1217",
            }),
      },
    },
    border: {
      ...(mode === "dark"
        ? {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#a8b3cf66",
            sidebar: "#6176f3",
          }
        : {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#52586666",
            sidebar: "#6176f3",
          }),
    },
    iconColor: {
      ...(mode === "dark"
        ? {
            default: "#a8b3cf",
            hover: "#ffffff",
          }
        : {
            default: "#525866",
            hover: "black",
          }),
    },
    box: {
      ...(mode === "dark"
        ? {
            background: {
              default: "#0e1217",
            },
            shadow: {
              default: "#d1d1d1",
            },
          }
        : {
            background: {
              default: "#ffffff",
            },
            shadow: {
              default: "#d1d1d1",
            },
          }),
    },
    button: {
      ...(mode === "dark"
        ? {
            default: "#20b8fb",
          }
        : {
            default: "#20b8fb",
          }),
    },
    sidebar: {
      ...(mode === "dark"
        ? {
            background: {
              default: "#0e1217",
            },
            border: "#a8b3cf",
            activeIcon: "#6176f3",
            normalIcon: "#999",
          }
        : {
            background: {
              default: "#ffffff",
            },
            border: "#ccc",
            activeIcon: "#6176f3",
            normalIcon: "#999",
          }),
    },
    musicplayer: {
      ...(mode === "dark"
        ? {
            default: "#323844",
          }
        : {
            default: "#323844",
          }),
    },
    boxitem: {
      ...(mode === "dark"
        ? {
            backgroundColor: {
              default: "#323844",
            },
            borderRadius: {
              default: "10px",
            },
          }
        : {
            backgroundColor: {
              default: "#323844",
            },
            borderRadius: {
              default: "10px",
            },
          }),
    },
    text: {
      ...(mode === "dark"
        ? {
            color: {
              first: "#ffffff",
              second: "#ccc",
            },
            fontSize: {
              first: "16px",
              second: "14px",
            },
          }
        : {
            color: {
              first: "#0e1217",
              second: "#ccc",
            },
            fontSize: {
              first: "16px",
              second: "14px",
            },
          }),
    },
  },
});
const Layout = (props) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.on);

  useEffect(() => {
    const getTheme = JSON.parse(localStorage.getItem("darkMode")) || false;
    dispatch(getDarkMode(getTheme));
  }, []);

  const { data: session, status } = useSession();
  if (session && session.user.access_token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.user.access_token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }

  const theme = createTheme(getDesignTokens(isDarkMode ? "dark" : "light"));

  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(83deg, ${theme.palette.background.first} 0%, ${theme.palette.background.second} 29%, ${theme.palette.background.third} 100%)`,
    color: theme.palette.text.color.first,
    minHeight: "100vh",
    width: "100vw",
    minHeight: "-webkit-fill-available",
  }));
  const ContainerBoxWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.box.background.default,
    // height: "600px",
    maxWidth: "800px",
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
    "::-webkit-scrollbar": {
      display: "none",
    },
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />

        <ContainerWrapper>
          <ContainerBoxWrapper
            sx={{
              borderRadius: { xs: "0px", md: "30px" },
              height: { xs: "calc(100% - 0px)", md: "calc(100% - 20px)" },
            }}
          >
            <Sidebar />
            <ContainerBoxRightWrapper
              sx={{
                width: {
                  xs: "100%",
                  md: "calc(100% - 90px)",
                },
                left: {
                  xs: "0",
                  md: "90px",
                },
              }}
            >
              <BoxWrapper
                sx={{
                  height: { xs: "calc(100% - 70px)", md: "100%" },
                }}
              >
                {props.children}
                <Footer />
              </BoxWrapper>
            </ContainerBoxRightWrapper>
          </ContainerBoxWrapper>
        </ContainerWrapper>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      </ThemeProvider>
    </>
  );
};
export default Layout;
