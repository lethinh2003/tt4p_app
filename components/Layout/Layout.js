import { Box } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import Sidebar from "./Sidebar";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.palette.background.first};
  }
  ::-webkit-scrollbar-thumb {
  background-color:  ${({ theme }) => theme.palette.background.first};

  &:hover {
    background-color:  ${({ theme }) => theme.palette.background.first};
  }
}
.MuiBackdrop-root {
  background-color:${({ theme }) => theme.palette.background.overlay} ;
}
`;

const getDesignTokens = (mode) => ({
  typography: {
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
          }
        : {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#edf0f7",
            overlay: "#0e12173d",
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
          }
        : {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#52586666",
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
  const [darkMore, setDarkMore] = useState(false);
  useEffect(() => {
    const getTheme = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMore(getTheme);
    console.log("dark more", getTheme);
  }, []);

  //   const { data: session, status } = useSession();
  //   if (session && session.user.access_token) {
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${session.user.access_token}`;
  //   } else {
  //     axios.defaults.headers.common["Authorization"] = null;
  //   }
  //   const [isSidebarMobile, setIsSidebarMobile] = useState(false);

  //   const getStatusDarkmode = useSelector((state) => state.getDarkmode);
  //   const dispatch = useDispatch();
  //   const handleClickSwitch = () => {
  //     dispatch(getDarkmode(!getStatusDarkmode));
  //   };
  //   const handleClickSidebarMobile = () => {
  //     setIsSidebarMobile(!isSidebarMobile);
  //   };

  //   useEffect(() => {
  //     const test = JSON.parse(localStorage.getItem("darkMode")) || false;
  //     dispatch(getDarkmode(test));
  //   }, []);

  const theme = createTheme(getDesignTokens(darkMore ? "dark" : "light"));
  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(83deg, ${theme.palette.background.first} 0%, ${theme.palette.background.second} 29%, ${theme.palette.background.third} 100%)`,
    color: theme.palette.text.color.first,
    minHeight: "100vh",
    width: "100vw",
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
    padding: "20px",
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />

        <ContainerWrapper>
          <ContainerBoxWrapper>
            <Sidebar setDarkMore={setDarkMore} />
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
              {props.children}
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
