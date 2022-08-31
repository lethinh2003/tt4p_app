import InputUnstyled from "@mui/base/InputUnstyled";
import { Box, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import React from "react";
const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
    width: 100%;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};

    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
  
    &:hover {
   
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[100]
      };
    }
  `
);

const StyledTextareaElement = styled("textarea")(
  ({ theme }) => `
    width: 100%;
    font-size: 1.45rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)"};
    background-color: ${theme.palette.latestPost.background.first};
    border: 1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.23)"
        : "rgba(0, 0, 0, 0.23)"
    };
    border-radius: 5px;
    padding: 12px 12px;

  `
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{
        Input: StyledInputElement,
        Textarea: StyledTextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

const About = ({ account }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          overflowX: "auto",
          border: (theme) => `1px solid ${theme.palette.border.dialog}`,
          backgroundColor: (theme) => theme.palette.latestPost.background.first,
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
            gap: "30px",
            overflowX: "auto",

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
            Thông tin {account.account}
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
              Username
            </Typography>
            <TextField
              size="small"
              fullWidth
              defaultValue={account.account}
              disabled
            />
          </Box>
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
              Họ tên
            </Typography>
            <TextField
              size="small"
              fullWidth
              defaultValue={account.name}
              disabled
            />
          </Box>
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
              Giới thiệu
            </Typography>
            <CustomInput
              multiline
              sx={{
                fontSize: "1.7rem",
                width: "100%",
                height: "100%",
                border: 0,
                outline: "none",
              }}
              value={account.bio}
              type="text"
              disabled
            />
          </Box>
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
              Đang sống ở
            </Typography>
            <TextField
              size="small"
              fullWidth
              defaultValue={account.city}
              disabled
            />
          </Box>
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
              Tham gia lúc
            </Typography>
            <TextField
              size="small"
              fullWidth
              defaultValue={dayjs(account.createdAt).format(
                "DD/MM/YYYY hh:mm:ss"
              )}
              disabled
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default About;
