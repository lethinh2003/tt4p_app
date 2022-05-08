import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Portal/Layout";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import ResetPass from "../../components/Auth/ResetPass";
const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState("");
  const router = useRouter();
  const { tokenResetPassword } = router.query;
  console.log(tokenResetPassword);
  useEffect(() => {
    if (tokenResetPassword) {
      checkToken();
    }
  }, [tokenResetPassword]);
  const checkToken = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/reset-password/${tokenResetPassword}`
      );
      setInfo(res.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
        window.location.href = "/";
      }
    }
  };
  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.box.background.default,
    height: "100%",
    maxWidth: "420px",
    width: "100%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    borderRadius: "30px",

    boxShadow: `0px 4px 6px 2px ${theme.palette.box.shadow.default}`,
  }));
  const BoxWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    maxHeight: "calc(100% - 40px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 10px",
    gap: "10px",
    overflowY: "auto",
    margin: "10px 0",
  }));
  const ButtonWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: "#fd6b2229",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "#fd6b2229",
      opacity: 0.8,
    },
  }));
  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });

  return (
    <>
      <Layout>
        <ContainerWrapper
          sx={{
            borderRadius: { xs: "0px" },
            height: { xs: "calc(100% - 0px)" },
          }}
        >
          <Box
            sx={{
              height: "100%",
              maxHeight: "100%",
              overflowY: "auto",
              padding: "20px 10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "35px",
                alignSelf: "center",
              }}
            >
              Khôi phục mật khẩu tài khoản
            </Typography>
            {isLoading && <Typography>Yêu cầu đang được thực hiện</Typography>}
            {info && (
              <ResetPass info={info} tokenResetPassword={tokenResetPassword} />
            )}
          </Box>
        </ContainerWrapper>
      </Layout>
    </>
  );
};
export default ResetPassword;
