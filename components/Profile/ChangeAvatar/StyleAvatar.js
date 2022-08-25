import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeAvatar from "./ChangeAvatar";
const StoriesAvatar = ({ setAvatarSVG, avatarSVG }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.data);
  const [key, setKey] = useState("style");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const menuOption = [
    {
      key: "shop",
      title: "Shop",
    },
    {
      key: "style",
      title: "Style",
    },
  ];
  const handleClickTypeChange = (item) => {
    setKey(item);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",

            display: "flex",
            gap: "10px",
            padding: "0 10px",
            borderTop: (theme) => `1px solid ${theme.palette.border.dialog}`,
            borderRight: (theme) => `1px solid ${theme.palette.border.dialog}`,
            borderLeft: (theme) => `1px solid ${theme.palette.border.dialog}`,

            overflowX: "auto",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          {menuOption.map((item, i) => (
            <Box
              onClick={() => handleClickTypeChange(item.key)}
              key={item.key}
              sx={{
                cursor: "pointer",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color:
                    key === item.key
                      ? "#0079D3"
                      : (theme) => theme.palette.text.color.first,
                  borderBottom: key === item.key ? "2px solid #0079D3" : null,
                  padding: "10px 0px",
                  textTransform: "uppercase",
                  "&:hover": {
                    color: "#0079D3",
                  },
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            border: (theme) => `2px solid ${theme.palette.border.dialog}`,
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",

            flex: 1,
            maxHeight: "calc(100vh - 300px)",
            padding: "10px",
            overflow: "auto",
          }}
        >
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
    </>
  );
};
export default StoriesAvatar;
