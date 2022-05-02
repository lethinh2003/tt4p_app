import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import { createGlobalStyle } from "styled-components";
import Index from "../../components/Portal/Index";
// import PlayerInfo from "./PlayerInfo";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

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

const Portal = (props) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);
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
  const theme = createTheme(getDesignTokens("light"));
  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(83deg, ${theme.palette.background.first} 0%, ${theme.palette.background.second} 29%, ${theme.palette.background.third} 100%)`,
    color: theme.palette.text.first,
    minHeight: "100vh",
    height: "100%",
    width: "100vw",
    position: "relative",
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContainerWrapper>
          <Index />
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
export default Portal;
export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session && session.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};
