import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import { createGlobalStyle } from "styled-components";
import Sidebar from "./Sidebar";

// import PlayerInfo from "./PlayerInfo";
import { styled } from "@mui/material/styles";

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
            first: "#09071c",
            second: "#122536",
            third: "#350c2c",
          }
        : {
            first: "#09071c",
            second: "#122536",
            third: "#350c2c",
          }),
    },
    sidebar: {
      ...(mode === "dark"
        ? {
            default: "#323844",
          }
        : {
            default: "#323844",
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
              first: "#ffffff",
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
  const theme = createTheme(getDesignTokens("dark"));
  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(83deg, ${theme.palette.background.first} 0%, ${theme.palette.background.second} 29%, ${theme.palette.background.third} 100%)`,
    color: theme.palette.text.first,
    minHeight: "100vh",
    width: "100vw",
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Sidebar />
        <ContainerWrapper>{props.children}</ContainerWrapper>
      </ThemeProvider>
    </>
  );
};
export default Layout;
