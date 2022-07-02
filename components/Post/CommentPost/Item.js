import { Avatar, Box, Typography, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import convertChat from "../../../utils/convertChat";
import convertTime from "../../../utils/convertTime";
import CommentEmotion from "./CommentEmotion";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import { memo } from "react";
import RepCommentItem from "../RepCommentPost/RepCommentItem";
import { useSelector } from "react-redux";
import checkIsCommentLoading from "../../../utils/checkIsCommentLoading";
import { BigHead } from "@bigheads/core";
import checkUserOnline from "../../../utils/checkUserOnline";
const Item = ({
  isChildren,
  socket,
  item,
  setReplyComment,
  createCommentBoxRef,
  setEditComment,
}) => {
  const hasChildren = item && item.rep_comments.length;
  const { data: session, status } = useSession();
  const listCommentsLoading = useSelector((state) => state.listCommentsLoading);
  const listUsersOnline = useSelector((state) => state.usersOnline);
  const [isOnline, setIsOnline] = useState(false);

  const timeRef = useRef(null);
  const [dataItem, setDataItem] = useState(item);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenOption, setIsOpenOption] = useState(false);
  useEffect(() => {
    const checkOnline = checkUserOnline(item.user[0], listUsersOnline);
    setIsOnline(checkOnline);
  }, [listUsersOnline]);
  useEffect(() => {
    if (checkIsCommentLoading(item._id, listCommentsLoading)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [listCommentsLoading]);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isOnline ? "#44b700" : "#cb1760",
      color: isOnline ? "#44b700" : "#cb1760",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  }));

  return (
    <>
      {dataItem && (
        <Box
          sx={{
            width: "100%",

            borderBottom: (theme) =>
              isChildren ? "unset" : `1px solid ${theme.palette.border.dialog}`,
            borderLeft: (theme) => `1px solid ${theme.palette.border.dialog}`,
            gap: isChildren ? "0px" : "20px",

            display: "flex",
            fontSize: "3rem",
            color: "#ffffff",

            alignItems: "flex-start",
            fontWeight: "bold",
            padding: isChildren ? "0px" : "20px 0px",
            flexDirection: "column",
            position: "relative",
            marginLeft: isChildren ? "20px" : "0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",

              flexDirection: "column",
              width: "100%",
              opacity: isLoading ? 0.7 : 1,
              pointerEvents: isLoading ? "none" : "visible",
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
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
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
                </StyledBadge>
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
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingLeft: "20px",
              }}
            >
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
                <CommentEmotion item={item} />
                <ReplyComment
                  createCommentBoxRef={createCommentBoxRef}
                  item={item}
                  setReplyComment={setReplyComment}
                />
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
          </Box>

          {/* Rep Comment */}
          {hasChildren &&
            item.rep_comments.map((item, i) => (
              <Item
                isChildren={true}
                key={i}
                setReplyComment={setReplyComment}
                createCommentBoxRef={createCommentBoxRef}
                item={item}
                socket={socket}
                setEditComment={setEditComment}
              />
            ))}
        </Box>
      )}
    </>
  );
};
export default memo(Item);
