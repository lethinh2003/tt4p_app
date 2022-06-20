import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getToggleBanned } from "../../redux/actions/getToggleBanned";
import { getUser } from "../../redux/actions/getUser";
import useLoading from "../../utils/useLoading";
import YourSelf from "../Homepage/YourSelf";
import Loading from "../Loading/Loading";
import OptionChat from "./OptionChat";

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
    if (status === "authenticated" && !data) {
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (data && data.data) {
      setUser(data.data);

      if (data.data.status === false) {
        dispatch(getToggleBanned(true));
      }
    }
  }, [data]);
  useEffect(() => {
    return () => clearInterval(TimeIntervalFindPartner.current);
  }, []);

  useEffect(() => {
    if (errorGetUser) {
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);

  return (
    <>
      {requesting && !data && <ThreeDots fill="#06bcee" />}
      {data && data.data && (
        <>
          {/* <Loading isLoading={isLoading} /> */}

          <YourSelf user={user} />
          {!isError && !getToggleStatusBanned && <OptionChat />}
        </>
      )}
    </>
  );
};
export default User;
