import { Box } from "@mui/material";
import Link from "next/link";
import { memo, useState } from "react";
import OptionItem from "./OptionItem";
import { BsThreeDots } from "react-icons/bs";

const Item = ({ item, session, account }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenOptionMenu, setIsOpenOptionMenu] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [isStatus, setIsStatus] = useState(item.status);
  const handleClickOpenOptionMenu = () => {
    setIsOpenOptionMenu(!isOpenOptionMenu);
  };

  return (
    <>
      {!isHide && session && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            position: "relative",
            pointerEvents: isLoading ? "none" : "visible",
            opacity: isLoading ? "0.5" : "1",
          }}
        >
          <Link href={`/posts/${item._id}`}>
            <Box
              sx={{
                textAlign: "center",
                cursor: "pointer",
                height: "250px",
                overflowWrap: "break-word",
                border: (theme) => `2px solid ${theme.palette.border.dialog}`,
                backgroundColor: !isStatus
                  ? "black"
                  : item.color
                  ? item.color
                  : "#ccc",
                borderRadius: "30px",

                fontSize: "3rem",
                color: "#ffffff",

                fontWeight: "bold",
                padding: "20px",
                position: "relative",
                "&:hover": {
                  border: (theme) =>
                    `2px solid ${theme.palette.border.dialogHover}`,
                },
              }}
            >
              {!isStatus && (
                <Box
                  sx={{
                    zIndex: 1,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src="https://i.imgur.com/B74D0zI.png"
                    style={{
                      width: "50px",
                    }}
                  />
                </Box>
              )}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",

                  WebkitMaskImage:
                    "linear-gradient(180deg,#000 60%,transparent)",
                  maskImage: "linear-gradient(180deg,#000 60%,transparent)",
                }}
              >
                <Box>{item.title}</Box>
              </Box>
            </Box>
          </Link>
          {session.user.account === account.account && (
            <>
              <Box
                onClick={() => handleClickOpenOptionMenu()}
                sx={{
                  position: "absolute",
                  bottom: 15,
                  left: 15,
                  cursor: "pointer",
                  padding: "0 5px",
                  fontSize: "2rem",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: isOpenOptionMenu
                    ? (theme) => theme.palette.text.color.active
                    : "#ffffff",
                  borderRadius: "5px",
                  backgroundColor: isOpenOptionMenu ? "#dbe1f5" : null,
                }}
              >
                <BsThreeDots style={{ fontSize: "2rem" }} />
              </Box>
              {isOpenOptionMenu && (
                <OptionItem
                  item={item}
                  setIsHide={setIsHide}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  handleClickOpenOptionMenu={handleClickOpenOptionMenu}
                  setIsStatus={setIsStatus}
                  isStatus={isStatus}
                  setIsOpenOptionMenu={setIsOpenOptionMenu}
                />
              )}
            </>
          )}
        </Box>
      )}
    </>
  );
};
export default memo(Item);
