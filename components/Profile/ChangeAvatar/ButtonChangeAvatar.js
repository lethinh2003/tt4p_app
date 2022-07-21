import { Box, Typography, DialogContentText } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Modal from "../../Modal/Modal";
import { BigHead } from "@bigheads/core";
import CurrentAvatar from "./CurrentAvatar";
import ChangeAvatar from "./ChangeAvatar";
import { useSelector, useDispatch } from "react-redux";
import { _avatarChange } from "../../../redux/actions/_avatarChange";
import { SET_AVATAR_USER } from "../../../redux/actions/constants";
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
            <Box
              sx={{
                border: "1px solid #2a2c2d",
                borderRadius: "6px",
                flex: 1,
                height: "calc(100vh - 40px)",
                padding: "10px",
              }}
            >
              <Box sx={{ height: "100%", overflow: "auto" }}>
                <ChangeAvatar
                  sx={{
                    width: "150px",
                    height: "150px",
                  }}
                  setAvatarSVG={setAvatarSVG}
                  avatarSVG={avatarSVG}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: "40%",
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
