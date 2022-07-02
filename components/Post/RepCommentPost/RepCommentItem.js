import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { memo, useRef, useState, useEffect } from "react";
import convertChat from "../../../utils/convertChat";
import convertTime from "../../../utils/convertTime";
import RepCommentEmotion from "./RepCommentEmotion";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { useSelector } from "react-redux";
import checkIsCommentLoading from "../../../utils/checkIsCommentLoading";
import { BigHead } from "@bigheads/core";

const RepCommentItem = ({
  item,
  createCommentBoxRef,
  setEditComment,
  socket,
}) => {
  const { data: session, status } = useSession();
  const listCommentsLoading = useSelector((state) => state.listCommentsLoading);

  const timeRef = useRef(null);
  const [dataItem, setDataItem] = useState(item);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenOption, setIsOpenOption] = useState(false);
  useEffect(() => {
    if (checkIsCommentLoading(item._id, listCommentsLoading)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [listCommentsLoading]);
  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));
  const handleChangeOpenOption = () => {
    console.log(isOpenOption);
    setIsOpenOption(!isOpenOption);
  };

  return (
    <>
      <Box
        sx={{
          opacity: isLoading ? 0.7 : 1,
          pointerEvents: isLoading ? "none" : "visible",
          position: "relative",
          display: "flex",
          paddingLeft: "20px",
          alignItems: "flex-start",
          gap: "10px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "100%",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",

                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
                border: "2px solid #23303a",
                boxShadow: "0px 3px 15px 0px #23303a",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50px",
                }}
              >
                <BigHead
                  accessory={item.user[0].avatarSVG.accessory}
                  body={item.user[0].avatarSVG.body}
                  circleColor={item.user[0].avatarSVG.circleColor}
                  clothing={item.user[0].avatarSVG.clothing}
                  clothingColor={item.user[0].avatarSVG.clothingColor}
                  eyebrows={item.user[0].avatarSVG.eyebrows}
                  eyes={item.user[0].avatarSVG.eyes}
                  faceMask={item.user[0].avatarSVG.faceMask}
                  faceMaskColor={item.user[0].avatarSVG.faceMaskColor}
                  facialHair={item.user[0].avatarSVG.facialHair}
                  graphic={item.user[0].avatarSVG.graphic}
                  hair={item.user[0].avatarSVG.hair}
                  hairColor={item.user[0].avatarSVG.hairColor}
                  hat={item.user[0].avatarSVG.hat}
                  hatColor={item.user[0].avatarSVG.hatColor}
                  lashes={item.user[0].avatarSVG.lashes}
                  lipColor={item.user[0].avatarSVG.lipColor}
                  mask={item.user[0].avatarSVG.mask}
                  mouth={item.user[0].avatarSVG.mouth}
                  skinTone={item.user[0].avatarSVG.skinTone}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.color.first,
                  }}
                >
                  {item.user[0].name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: (theme) => theme.palette.text.color.second,
                  }}
                >
                  @{item.user[0].account}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                {convertTime(item.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            color: "#757474",
            fontSize: "1.7rem",
            fontWeight: 500,
          }}
        >
          {convertChat(item.content)}
        </Box>
        <Box
          sx={{
            fontSize: "1.7rem",
            display: "flex",

            alignItems: "center",
            color: (theme) => theme.palette.text.color.second,
          }}
        >
          <RepCommentEmotion item={item} />
          {session.user.id === item.user[0]._id && (
            <>
              <EditComment
                item={item}
                createCommentBoxRef={createCommentBoxRef}
                setEditComment={setEditComment}
                setIsLoadingOption={setIsLoading}
              />
              <DeleteComment
                setDataItem={setDataItem}
                socket={socket}
                item={item}
                setIsLoadingOption={setIsLoading}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
export default memo(RepCommentItem);
