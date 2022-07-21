import { BigHead } from "@bigheads/core";
import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/actions/getUser";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
const CurrentAvatar = ({
  sx,
  setIsLoadingModal,
  setIsOpenModal,
  setAvatarSVG,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const avatarChange = useSelector((state) => state._avatarChange);
  const handleClickSave = async () => {
    try {
      setIsLoadingModal(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/change-avatar`,
        {
          avatar: avatarChange,
        }
      );
      setIsOpenModal(false);
      setIsLoadingModal(false);
      dispatch(getUser(session.user.account));
    } catch (err) {
      setIsLoadingModal(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          ...sx,
          width: sx && sx.width ? sx.width : "50px",
          height: sx && sx.height ? sx.height : "50px",
          cursor: "pointer",

          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",

          maxWidth: "300px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: sx ? sx.width : "50px",
          }}
        >
          <BigHead {...avatarChange} />
        </Box>
      </Box>
      <Button onClick={() => handleClickSave()}>Save</Button>
    </>
  );
};
export default CurrentAvatar;
