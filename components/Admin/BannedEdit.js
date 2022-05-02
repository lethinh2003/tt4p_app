import { Box, DialogContentText } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllUsers } from "../../redux/actions/getAllUsers";
import useLoading from "../../utils/useLoading";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import socketIOClient from "socket.io-client";
let socket;
const BannedEdit = ({ user, toggle }) => {
  useEffect(() => {
    socketInitializer();
    return () => {
      socket.disconnect();
    };
  }, []);
  const socketInitializer = () => {
    socket = socketIOClient.connect(process.env.ENDPOINT_SERVER);
  };
  const { isLoading, setIsLoading } = useLoading();
  const dispatch = useDispatch();
  const Option = styled(Box)(({ theme }) => ({
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

  const handleClickChangeBannedStatus = async (value) => {
    if (user.status !== value) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/admin`,
          {
            account: user.account,
            status: value,
          }
        );
        socket.emit("banned-account", {
          account: user.account,
          status: value,
        });

        setIsLoading(false);
        toggle();
        dispatch(getAllUsers());
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      <DialogContentText>
        Tình trạng
        <Option>
          <Box className="item">
            <Box
              onClick={() => handleClickChangeBannedStatus(false)}
              className={!user.status ? "item__option active" : "item__option"}
            >
              <Box className="item__option--circle"></Box>
            </Box>
            <Box className="item__text">Cấm</Box>
          </Box>
          <Box className="item">
            <Box
              onClick={() => handleClickChangeBannedStatus(true)}
              className={user.status ? "item__option active" : "item__option"}
            >
              <Box className="item__option--circle"></Box>
            </Box>
            <Box className="item__text">Hoạt động</Box>
          </Box>
        </Option>
      </DialogContentText>
    </>
  );
};
export default BannedEdit;
