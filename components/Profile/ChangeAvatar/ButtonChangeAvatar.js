import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_AVATAR_USER } from "../../../redux/actions/constants";
import { _avatarChange } from "../../../redux/actions/_avatarChange";
import Modal from "../../Modal/Modal";
import CurrentAvatar from "./CurrentAvatar";
import StoriesAvatar from "./StoriesAvatar";
const ButtonChangeAvatar = ({ account, user }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.data);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [avatarSVG, setAvatarSVG] = useState(user.avatarSVG);
  const handleClickChangeAvatar = () => {
    setIsOpenModal(true);
    dispatch(
      _avatarChange({
        type: SET_AVATAR_USER,
        data: dataUser.data.avatarSVG,
      })
    );
  };
  useEffect(() => {
    dispatch(
      _avatarChange({
        type: SET_AVATAR_USER,
        data: user.avatarSVG,
      })
    );
  }, []);
  return (
    <>
      {isOpenModal && (
        <Modal
          title={"Change Avatar"}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        >
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
              pointerEvents: isLoadingModal ? "none" : "visible",
              opacity: isLoadingModal ? 0.6 : 1,
              flexDirection: { xs: "column-reverse", lg: "row" },
            }}
          >
            <StoriesAvatar setAvatarSVG={setAvatarSVG} avatarSVG={avatarSVG} />
            <Box
              sx={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CurrentAvatar
                setAvatarSVG={setAvatarSVG}
                setIsLoadingModal={setIsLoadingModal}
                setIsOpenModal={setIsOpenModal}
                sx={{
                  width: "350px",
                  height: "350px",
                }}
              />
            </Box>
          </Box>
        </Modal>
      )}
      <Box
        sx={{
          background: "linear-gradient(90deg,#ec0623,#ff8717)",
          width: "100%",
          borderRadius: "20px",
        }}
        onClick={() => handleClickChangeAvatar()}
      >
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#ffffff",
            padding: "5px 10px",
          }}
        >
          Change Avatar
        </Typography>
      </Box>
    </>
  );
};
export default ButtonChangeAvatar;
