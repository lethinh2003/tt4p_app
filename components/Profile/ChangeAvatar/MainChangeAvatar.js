import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_AVATAR_USER } from "../../../redux/actions/constants";
import { _avatarChange } from "../../../redux/actions/_avatarChange";

import CurrentAvatar from "./CurrentAvatar";
import StoriesAvatar from "./StoriesAvatar";
const MainChangeAvatar = ({ avatarSVG, setAvatarSVG, setIsOpenModal }) => {
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  return (
    <>
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
    </>
  );
};
export default MainChangeAvatar;
