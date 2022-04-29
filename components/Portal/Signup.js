import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Signup = ({ setStep, setInfo, info }) => {
  const currentYears = new Date().getFullYear();
  const [date, setDate] = useState(info.date ? info.date : currentYears);
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
  const generateYearOptions = () => {
    const arrDate = [];
    const startYear = 1950;
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

  // form validation rules
  const validationSchema = Yup.object().shape({
    account: Yup.string()
      .required("Account is required")
      .min(5, "Min-length 5, please re-enter")
      .trim("Account invalid")
      .matches(/^\S*$/, "Account invalid")
      .strict(true),
    name: Yup.string()
      .required("Name is required")
      .min(2, "Min-length 2, please re-enter"),

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
      if (date >= 1950 && date <= currentYears) {
        setIsLoading(true);
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/check-user`,
          {
            account: data.account,
          }
        );

        setInfo((prev) => ({
          ...prev,
          account: data.account,
          name: data.name,
          password: data.password,
          date,
        }));

        setStep(5);
        setIsLoading(false);
      }
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
    height: "100%",
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
    fontWeight: "bold",
    width: "100%",

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
    lineHeight: 1.66,
    fontSize: "1rem",
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
              defaultValue={info.account ? info.account : ""}
            />
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LabelInput>Password</LabelInput>

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
              defaultValue={info.password ? info.password : ""}
            />
            <ErrorContent>
              {errors.password ? errors.password.message : ""}
            </ErrorContent>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LabelInput>Họ tên</LabelInput>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  fullWidth
                  error={errors.name ? true : false}
                  helperText={errors.name ? errors.name.message : ""}
                  {...field}
                />
              )}
              defaultValue={info.name ? info.name : ""}
            />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LabelInput>Năm sinh</LabelInput>
            <Select
              value={date}
              defaultValue={info.date ? info.date : currentYears}
              onChange={(e) => setDate(e.target.value)}
            >
              {generateYearOptions()}
            </Select>
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
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
export default Signup;
