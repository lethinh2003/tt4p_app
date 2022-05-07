import { Box, Button, DialogContentText, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import useLoading from "../../utils/useLoading";
import Loading from "../Loading/Loading";
import axios from "axios";
import { signOut } from "next-auth/react";

const InfoEditEmail = ({ user }) => {
  const timeRef = useRef(null);
  const { isLoading, setIsLoading } = useLoading();
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [isSend, setIsSend] = useState(false);
  const [timeDuration, setTimeDuration] = useState(60);

  useEffect(() => {
    if (isSend) {
      timeRef.current = setInterval(() => {
        if (timeDuration <= 1) {
          clearInterval(timeRef.current);
          setIsSend(false);
          setTimeDuration(60);
        } else {
          setTimeDuration((prev) => prev - 1);
        }
      }, 1000);
      return () => clearInterval(timeRef.current);
    } else {
      return () => {
        clearInterval(timeRef.current);
        setTimeDuration(60);
      };
    }
  }, [timeDuration, isSend]);

  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
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
  }));
  const handleClickSubmit = async () => {
    if (!isSend) {
      if (!validator.isEmail(email)) {
        toast.error("Email không hợp lệ, vui lòng thử lại");
      } else if (user.active_email) {
        toast.error("Bạn đã kích hoạt email rồi!");
      } else {
        try {
          setIsSend(true);
          setIsLoading(true);
          const activeEmail = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/users/active-email`,
            {
              email: email,
            }
          );
          toast.info(activeEmail.data.message);

          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          if (err.response) {
            if (err.response.data.message.name === "TokenExpiredError") {
              toast.error("Tài khoản hết hạn! Vui lòng đăng nhập lại!");
              signOut();
            }
            toast.error(err.response.data.message);
          }
        }
      }
    }
  };
  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      <DialogContentText>Email</DialogContentText>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TextField
          sx={{
            flex: 1,
          }}
          size="small"
          defaultValue={email}
          disabled
          placeholder={"Nhập email để lấy lại tài khoản"}
        />
        {!user.active_email && (
          <ButtonSocialWrapper
            sx={{
              opacity: isSend ? 0.8 : 1,
              pointerEvents: isSend ? "none" : null,
            }}
            onClick={handleClickSubmit}
          >
            Kích hoạt {isSend && timeDuration + "s"}
          </ButtonSocialWrapper>
        )}
      </Box>
    </>
  );
};
export default InfoEditEmail;
