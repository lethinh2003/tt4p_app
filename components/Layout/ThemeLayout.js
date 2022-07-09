import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { SET_DARKMODE } from "../../redux/actions/constants";
import { _darkMode } from "../../redux/actions/_darkMode";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.palette.box.background.default};
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

          maxWidth: "200px",
          textTransform: "capitalize",
          borderRadius: "10px",

          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "1.2rem",
          "&:hover": {
            backgroundColor: theme.palette.button.default,
            opacity: 0.8,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiFormHelperText-root": {
            fontSize: "1.2rem",
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
    bottomMenu: {
      background: {
        ...(mode === "light"
          ? {
              default: "#323435",
            }
          : {
              default: "#ffffff",
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
            feeds: "#ffffff",
            menuright_option: "#d8e4f2",
          }
        : {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#52586666",
            sidebar: "#6176f3",
            feeds: "#ffffff",
            menuright_option: "#d8e4f2",
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
              default: "#f0f5fd",
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
            boxShadow: "#cccccc12",
            border: "#ccc",
            activeIcon: "#6176f3",
            normalIcon: "#999",
          }),
    },
    feeds: {
      ...(mode === "dark"
        ? {
            boxShadow: "#c3cddbab;",
          }
        : {
            boxShadow: "#c3cddbab;",
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
              second: "#a4b6e1",
              active: "#a974ff",
            },
            fontSize: {
              first: "16px",
              second: "14px",
            },
          }
        : {
            color: {
              first: "#25396f",
              second: "#a4b6e1",
              active: "#a974ff",
            },
            fontSize: {
              first: "16px",
              second: "14px",
            },
          }),
    },
  },
});
const ThemeLayout = (props) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.on);
  useEffect(() => {
    const getTheme = JSON.parse(localStorage.getItem("darkMode")) || false;
    dispatch(
      _darkMode({
        type: SET_DARKMODE,
        data: getTheme,
      })
    );
  }, []);

  const { data: session, status } = useSession();

  if (session && session.user) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.user.access_token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }

  const theme = createTheme(getDesignTokens(isDarkMode ? "dark" : "light"));

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />

        {props.children}

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
export default ThemeLayout;
