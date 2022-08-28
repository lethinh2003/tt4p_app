import { Box, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_DARKMODE } from "../../../redux/actions/constants";
import { _darkMode } from "../../../redux/actions/_darkMode";
const System = ({}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.on);
  const handleChangeTheme = (value) => {
    if (value === "dark") {
      dispatch(
        _darkMode({
          type: SET_DARKMODE,
          data: true,
        })
      );
      localStorage.setItem("darkMode", "true");
    } else {
      dispatch(
        _darkMode({
          type: SET_DARKMODE,
          data: false,
        })
      );
      localStorage.setItem("darkMode", "false");
    }
  };

  const ThemeOption = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "5px",

    "& .item": {
      display: "flex",
      gap: "5px",
      alignItems: "center",
      color: theme.palette.text.color.first,
      fontSize: "1.4rem",

      "&__option": {
        cursor: "pointer",
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&--circle": {
          width: "23px",
          height: "23px",
          borderRadius: "50%",
          border: "2px solid",
        },
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "light" ? "#0e12173d" : "#95999d3d",
        },
        "&:hover .item__option--circle": {
          border: "4px solid",
        },
        "&.active .item__option--circle ": {
          backgroundColor:
            theme.palette.mode === "light" ? "#3a6ebd" : "#20b8fb",
        },
      },
      "&__text": {},
    },
  }));

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
            gap: "30px",
            overflowX: "auto",
            borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,

            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: (theme) => theme.palette.text.color.first,
            }}
          >
            Cài đặt hệ thống
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              Theme
            </Typography>

            <ThemeOption>
              <Box className="item">
                <Box
                  onClick={() => handleChangeTheme("dark")}
                  className={
                    isDarkMode ? "item__option active" : "item__option"
                  }
                >
                  <Box className="item__option--circle"></Box>
                </Box>
                <Box className="item__text">Darkmode</Box>
              </Box>
              <Box className="item">
                <Box
                  onClick={() => handleChangeTheme("light")}
                  className={
                    !isDarkMode ? "item__option active" : "item__option"
                  }
                >
                  <Box className="item__option--circle"></Box>
                </Box>
                <Box className="item__text">Lightmode</Box>
              </Box>
            </ThemeOption>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default System;
