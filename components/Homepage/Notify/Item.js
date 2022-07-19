import { Box, Typography } from "@mui/material";
import { useState, memo } from "react";
import AvatarUser from "../AvatarUser";
import { timeFromNow } from "../../../utils/convertTime";
import { BsThreeDots } from "react-icons/bs";
import OptionItem from "./OptionItem";
const Item = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenOptionMenu, setIsOpenOptionMenu] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const handleClickOpenOptionMenu = () => {
    setIsOpenOptionMenu(!isOpenOptionMenu);
  };

  return (
    <>
      {!isHide && (
        <Box
          sx={{
            pointerEvents: isLoading ? "none" : "visible",
            opacity: isLoading ? "0.5" : "1",
            marginBottom: "5px",
            height: "115px",
            backgroundColor: !item.read ? "#e9f5fd" : null,
            padding: "15px",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <AvatarUser
              user={item.user_send}
              sx={{
                width: "40px",
                height: "40px",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
              }}
            >
              {item.user_send.account}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeigth: "bold",

                overflow: "hidden !important",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.content}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.4rem",

                color: (theme) => theme.palette.text.color.second,
              }}
            >
              {timeFromNow(item.createdAt)}
            </Typography>
          </Box>
          <Box
            onClick={() => handleClickOpenOptionMenu()}
            sx={{
              cursor: "pointer",
              padding: "0 5px",
              fontSize: "2rem",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#e8ecf9",
              },
            }}
          >
            <BsThreeDots />
          </Box>
          {isOpenOptionMenu && (
            <OptionItem
              item={item}
              setIsHide={setIsHide}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}
        </Box>
      )}
    </>
  );
};
export default memo(Item);
