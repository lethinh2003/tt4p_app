import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Login = ({ setStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0, y: "-100%", pointerEvents: "none" },
  };
  const loadingVariants = {
    open: { opacity: 1, display: "flex" },
    closed: { opacity: 0, display: "none" },
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    account: Yup.string()
      .required("Account is required")
      .min(5, "Min-length 5, please re-enter")
      .trim("Account invalid")
      .matches(/^\S*$/, "Account invalid")
      .strict(true),

    password: Yup.string()
      .required("Password is required")
      .trim("Password invalid")
      .matches(/^\S*$/, "Password invalid")
      .strict(true),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm(formOptions);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const result = await signIn("login", {
        account: data.account,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      setIsLoading(false);
      if (result.error) {
        console.log(result.error);
        return toast.error(result.error);
      }
      toast.success("Đăng nhập thành công, chúc bạn tham gia vui vẻ");

      // window.location.reload();
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.first,
    height: "600px",
    width: "400px",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
  }));
  const BoxWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
  }));
  const ButtonWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",

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
    width: "100%",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#fd6b2229",
      opacity: 0.8,
    },
  }));
  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  const ErrorContent = styled(Typography)({
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: 1.66,
    textAlign: "left",
    margin: "4px 14px 0 14px",
    color: "#f44336",
  });
  return (
    <>
      <Box
        as={motion.div}
        animate={isLoading ? "open" : "closed"}
        variants={loadingVariants}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <Hearts fill="#cf65be" strokeOpacity={0.125} speed={0.75} />
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Đang tải...
        </Typography>
      </Box>
      <Box
        as={motion.div}
        animate={!isLoading ? "open" : "closed"}
        variants={variants}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LabelInput>Tài khoản</LabelInput>
            <Controller
              name="account"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  fullWidth
                  error={errors.account ? true : false}
                  helperText={errors.account ? errors.account.message : ""}
                  {...field}
                />
              )}
              defaultValue={""}
            />
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <LabelInput>Password</LabelInput>
              <LabelInput
                onClick={() => setStep("missing_password")}
                sx={{
                  cursor: "pointer",
                }}
              >
                Quên mật khẩu?
              </LabelInput>
            </Box>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  type={showPassword ? "text" : "password"}
                  size="small"
                  fullWidth
                  error={errors.password ? true : false}
                  {...field}
                />
              )}
              defaultValue={""}
            />
            <ErrorContent>
              {errors.password ? errors.password.message : ""}
            </ErrorContent>
          </FormControl>
          <Box
            as={motion.div}
            sx={{
              width: "calc(100% - 20px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Button
              sx={{
                width: "100%",
              }}
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng nhập
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
export default Login;
