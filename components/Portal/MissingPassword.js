import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import axios from "axios";

import * as Yup from "yup";

const MissingPassword = ({ setStep }) => {
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
    info: Yup.string()
      .required("Info Acount is required")
      .min(5, "Min-length 5, please re-enter")
      .trim("Info Acount invalid")
      .matches(/^\S*$/, "Info Account invalid")
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
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/missing-password/`,
        {
          info_account: data.info,
        }
      );

      setIsLoading(false);

      toast.success(res.data.message);
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
            <LabelInput>Thông Tin Tài khoản</LabelInput>
            <Controller
              name="info"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  fullWidth
                  error={errors.info ? true : false}
                  helperText={errors.info ? errors.info.message : ""}
                  {...field}
                />
              )}
              defaultValue={""}
            />
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
              Lấy lại mật khẩu
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
export default MissingPassword;
