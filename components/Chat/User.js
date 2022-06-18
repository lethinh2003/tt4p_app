import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { getToggleBanned } from "../../redux/actions/getToggleBanned";
import { getUser } from "../../redux/actions/getUser";
import useLoading from "../../utils/useLoading";
import Loading from "../Loading/Loading";
import YourSelf from "../Homepage/YourSelf";
import OptionChat from "./OptionChat";
let socket;
const User = () => {
  const TimeIntervalFindPartner = useRef(null);

  const { data: session, status } = useSession();
  const [isError, setIsError] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  const [user, setUser] = useState();
  const data = useSelector((state) => state.user.data);
  const requesting = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (data && data.data) {
      setUser(data.data);
      if (socket) {
        socket.emit("join-room-unique-account", data.data.account);
      }
      if (data.data.status === false) {
        dispatch(getToggleBanned(true));
        if (socket) {
          socket.disconnect();
        }
      }
    }
  }, [data]);
  useEffect(() => {
    return () => clearInterval(TimeIntervalFindPartner.current);
  }, []);

  useEffect(() => {
    socketInitializer();
    return () => {
      socket.disconnect();
    };
  }, [status]);

  useEffect(() => {
    if (errorGetUser) {
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);

  const socketInitializer = async () => {
    socket = socketIOClient.connect(process.env.ENDPOINT_SERVER);
  };

  return (
    <>
      {requesting && !data && <ThreeDots fill="#06bcee" />}
      {data && data.data && (
        <>
          <Loading isLoading={isLoading} />

          <YourSelf user={user} />
          {!isError && !getToggleStatusBanned && <OptionChat />}
        </>
      )}
    </>
  );
};
export default User;
