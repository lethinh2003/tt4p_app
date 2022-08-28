import {
  Box,
  Button,
  Skeleton,
  Typography,
  TextField,
  Select,
  MenuItem,
  Fade,
  Slide,
} from "@mui/material";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { styled } from "@mui/material/styles";
import useCity from "../../../utils/useCity";
import validator from "validator";
const Email = ({ account }) => {
  const [email, setEmail] = useState(account ? account.email : "");
  const [isActive, setIsActive] = useState(
    account ? account.active_email : false
  );
  const [isSending, setIsSending] = useState(false);
  const handleChangeEmail = (e) => {
    const email = e.target.value;

    setEmail(email);
  };

  const handleClickSubmit = async () => {
    if (!isSending) {
      if (!validator.isEmail(email)) {
        toast.error("Email không hợp lệ, vui lòng thử lại");
      } else if (isActive) {
        toast.error("Bạn đã kích hoạt email rồi!");
      } else {
        try {
          setIsSending(true);
          const activeEmail = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/users/active-email`,
            {
              email: email,
            }
          );
          toast.info(activeEmail.data.message);

          setIsSending(false);
        } catch (err) {
          setIsSending(false);
          if (err.response) {
            toast.error(err.response.data.message);
          }
        }
      }
    }
  };
  return (
    <>
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
          Email
        </Typography>
        <TextField
          size="small"
          fullWidth
          value={email}
          defaultValue={email}
          error={!validator.isEmail(email)}
          helperText={
            !validator.isEmail(email)
              ? "Vui lòng nhập địa chỉ email hợp lệ!"
              : null
          }
          onChange={(e) => handleChangeEmail(e)}
          disabled={true}
        />
        {isActive && (
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: (theme) => theme.palette.text.color.second,
            }}
          >
            Bạn đã xác thực địa chỉ email này. Địa chỉ email dùng để nhận thông
            báo các ưu đãi, bài viết, lấy lại mật khẩu... Bạn sẽ không thể thay
            đổi được nữa!
          </Typography>
        )}
        {!isActive && (
          <>
            <Button
              onClick={handleClickSubmit}
              sx={{
                pointerEvents:
                  !validator.isEmail(email) || isSending ? "none" : "visible",
                opacity: !validator.isEmail(email) || isSending ? 0.6 : 1,
              }}
            >
              Kích hoạt
            </Button>
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.second,
              }}
            >
              Lưu ý: Tài khoản của bạn chưa xác thực email, vui lòng xác thực để
              lấy lại mật khẩu, nhận ưu đãi mới nhất từ chúng tôi.
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};
export default memo(Email);
