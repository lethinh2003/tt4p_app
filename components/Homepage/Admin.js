import { Button, Typography } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import useLoading from "../../utils/useLoading";
import Loading from "../Loading/Loading";
import Users from "../Admin/Users";
let socket;
const Admin = () => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  return (
    <>
      <Typography
        as={motion.div}
        initial={{ opacity: 0 }}
        transition={{
          duration: 1,
        }}
        animate={{ opacity: 1 }}
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          alignSelf: "center",
        }}
      >
        Khu vực quản trị
      </Typography>
      <Users />
    </>
  );
};
export default Admin;
