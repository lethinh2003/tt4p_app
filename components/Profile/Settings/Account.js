import InputUnstyled from "@mui/base/InputUnstyled";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import useCity from "../../../utils/useCity";
import Email from "./Email";
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
  
    &:hover {
      outline: 1px solid ${
        theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)"
      };
    }

    &:focus {
      outline: 2px solid ${
        theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)"
      };
    }
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

const Account = ({ account }) => {
  const { city: listCities } = useCity();

  const [isSending, setIsSending] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState(account ? account.name : "");
  const [bio, setBio] = useState(account ? account.bio : "");
  const [findSex, setFindSex] = useState(account ? account.findSex : "");
  const [date, setDate] = useState(account ? account.date : 1950);
  const [city, setCity] = useState(account ? account.city : "");
  const [isHideInfo, setIsHideInfo] = useState(
    account ? account.hideInfo : true
  );

  const generateYearOptions = () => {
    const arrDate = [];
    const startYear = 1950;
    const currentYears = new Date().getFullYear();
    const endYear = currentYears;

    for (let i = endYear; i >= startYear; i--) {
      arrDate.push(
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
    }
    return arrDate;
  };
  const sexOptions = [
    {
      name: "Nam",
      key: "boy",
    },
    {
      name: "Nữ",
      key: "girl",
    },
    {
      name: "LGBT",
      key: "lgbt",
    },
  ];

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

  const handleChangeName = (e) => {
    let name = e.target.value;

    if (name.length < 2 || !name) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    setName(name);

    setIsEdited(true);
  };
  const handleChangeDate = (e) => {
    const date = e.target.value;

    setDate(date);

    setIsEdited(true);
  };
  const handleChangeCity = (e) => {
    const city = e.target.value;

    setCity(city);

    setIsEdited(true);
  };
  const handleChangeHideInfo = (e) => {
    setIsHideInfo(e);

    setIsEdited(true);
  };
  const handleChangeBio = (e) => {
    setBio(e.target.value);

    setIsEdited(true);
  };
  const handleChangeFindSex = (e) => {
    setFindSex(e);

    setIsEdited(true);
  };
  const checkCity = (ct) => {
    const findCity = listCities.filter((item) => item.province === ct);
    return findCity.length === 1;
  };
  const checkSex = (sex) => {
    const listSex = ["boy", "girl", "lgbt"];
    return listSex.includes(sex);
  };
  const handleClickSubmit = async () => {
    const checkCityUser = checkCity(city);
    if (!checkCityUser) {
      toast.error("Vui lòng nhập tỉnh/TP hợp lệ");
    } else if (name.length < 2) {
      toast.error("Vui lòng nhập tên hợp lệ");
    } else if (!checkSex(findSex)) {
      toast.error("Vui lòng nhập giới tính hợp lệ");
    } else {
      try {
        setIsSending(true);
        const updateUser = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/update`,
          {
            name: name,
            bio: bio,
            findSex: findSex,
            city: city,
            hideInfo: isHideInfo,
          }
        );
        setIsSending(false);
        window.location.reload();
      } catch (err) {
        setIsSending(false);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          pointerEvents: isSending ? "none" : "visible",
          opacity: isSending ? 0.5 : 1,
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
            Thông tin cá nhân
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
              value={name}
              defaultValue={name}
              error={name.length < 2}
              helperText={
                name.length < 2
                  ? "Vui lòng nhập tên hợp lệ, tên từ 2 kí tự trở lên!"
                  : null
              }
              onChange={(e) => handleChangeName(e)}
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
              value={bio}
              type="text"
              placeholder="Giới thiệu bản thân bạn nào!"
              onChange={(e) => handleChangeBio(e)}
            />
          </Box>

          <Email account={account} />
        </Box>
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
            Thông tin chatting
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
              Giới tính
            </Typography>
            <TextField
              size="small"
              fullWidth
              defaultValue={
                account.sex === "boy"
                  ? "Nam"
                  : account.sex === "girl"
                  ? "Nữ"
                  : "LGBT"
              }
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
              Tìm bạn
            </Typography>
            <ThemeOption>
              {sexOptions.map((item, i) => (
                <Box className="item" key={item.key}>
                  <Box
                    onClick={() => handleChangeFindSex(item.key)}
                    className={
                      findSex === item.key
                        ? "item__option active"
                        : "item__option"
                    }
                  >
                    <Box className="item__option--circle"></Box>
                  </Box>
                  <Box className="item__text">{item.name}</Box>
                </Box>
              ))}
            </ThemeOption>
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
              Ẩn thông tin
            </Typography>

            <ThemeOption>
              <Box className="item">
                <Box
                  onClick={() => handleChangeHideInfo(true)}
                  className={
                    isHideInfo ? "item__option active" : "item__option"
                  }
                >
                  <Box className="item__option--circle"></Box>
                </Box>
                <Box className="item__text">Bật</Box>
              </Box>
              <Box className="item">
                <Box
                  onClick={() => handleChangeHideInfo(false)}
                  className={
                    !isHideInfo ? "item__option active" : "item__option"
                  }
                >
                  <Box className="item__option--circle"></Box>
                </Box>
                <Box className="item__text">Tắt</Box>
              </Box>
            </ThemeOption>
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
              Năm sinh
            </Typography>
            <Select
              value={date}
              defaultValue={date}
              onChange={(e) => handleChangeDate(e)}
              disabled
            >
              {generateYearOptions()}
            </Select>
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
              Nơi ở hiện tại
            </Typography>
            <Select value={city} onChange={(e) => handleChangeCity(e)}>
              {listCities &&
                listCities.length > 0 &&
                listCities.map((item, i) => (
                  <MenuItem value={item.province} key={i}>
                    {item.province}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        </Box>
        {isEdited && (
          <Slide direction="up" in={isEdited}>
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.sidebar.background.default,
                position: "-webkit-sticky",
                position: "sticky",
                bottom: "0",
                textAlign: "center",
                padding: "10px",
                borderRadius: "5px",
                border: (theme) => `1px solid ${theme.palette.border.dialog}`,
              }}
            >
              <Button
                onClick={handleClickSubmit}
                sx={{
                  pointerEvents: isError ? "none" : "visible",
                  opacity: isError ? 0.6 : 1,
                }}
              >
                {isSending ? "Saving..." : "Save"}
              </Button>
            </Box>
          </Slide>
        )}
        {!isEdited && (
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.sidebar.background.default,
              textAlign: "center",
              borderRadius: "5px",
              padding: "10px",
              border: (theme) => `1px solid ${theme.palette.border.dialog}`,
            }}
          >
            <Button
              onClick={handleClickSubmit}
              sx={{
                pointerEvents: isError ? "none" : "visible",
                opacity: isError ? 0.6 : 1,
              }}
            >
              {isSending ? "Saving..." : "Save"}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
export default Account;
