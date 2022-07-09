import { useTheme } from "@emotion/react";
import { Dialog, DialogContentText, Switch, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { _darkMode } from "../../redux/actions/_darkMode";
import useModal from "../../utils/useModal";
import Warning from "./Warning";
import { toast } from "react-toastify";
import { getUser } from "../../redux/actions/getUser";
import { getToggleSetting } from "../../redux/actions/getToggleSetting";
import { useState } from "react";
import Loading from "../Loading/Loading";
import useLoading from "../../utils/useLoading";
import axios from "axios";
const HideInfoEdit = ({ user }) => {
  const { isLoading, setIsLoading } = useLoading();
  const [value, setValue] = useState();
  const { isShow, toggle } = useModal();
  const dispatch = useDispatch();
  const theme = useTheme();
  const ThemeOption = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "5px",

    "& .item": {
      display: "flex",
      gap: "5px",
      alignItems: "center",

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
          backgroundColor: "#0e12173d",
        },
        "&:hover .item__option--circle": {
          border: "4px solid",
        },
        "&.active .item__option--circle ": {
          backgroundColor: "#3a6ebd",
        },
      },
      "&__text": {},
    },
  }));

  const handleClickChangeValue = (value) => {
    setValue(value);
    toggle();
  };
  const handleChangeHideInfo = async (value) => {
    try {
      setIsLoading(true);
      const updateUser = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/update`,
        {
          hideInfo: value,
        }
      );
      setIsLoading(false);
      dispatch(getUser(user.account));
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <DialogContentText>
        Hiển thị thông tin
        <ThemeOption>
          <Box className="item">
            <Box
              onClick={() => handleClickChangeValue("false")}
              className={
                !user.hideInfo ? "item__option active" : "item__option"
              }
            >
              <Box className="item__option--circle"></Box>
            </Box>
            <Box className="item__text">Bật</Box>
          </Box>
          <Box className="item">
            <Box
              onClick={() => handleClickChangeValue("true")}
              className={user.hideInfo ? "item__option active" : "item__option"}
            >
              <Box className="item__option--circle"></Box>
            </Box>
            <Box className="item__text">Tắt</Box>
          </Box>
        </ThemeOption>
      </DialogContentText>
      {isShow && (
        <Warning
          isShow={isShow}
          toggle={toggle}
          handleChangeHideInfo={handleChangeHideInfo}
          value={value}
        />
      )}
    </>
  );
};
export default HideInfoEdit;
