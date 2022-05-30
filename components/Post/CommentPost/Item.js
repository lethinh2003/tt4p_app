import { Avatar, Box, Typography } from "@mui/material";
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
const Item = ({
  socket,
  item,
  setReplyComment,
  createCommentBoxRef,
  setEditComment,
}) => {
  const { data: session, status } = useSession();
  const listCommentsLoading = useSelector((state) => state.listCommentsLoading);
  console.log("list_comment_loading", listCommentsLoading);
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

  return (
    <>
      {dataItem && (
        <Box
          as={motion.div}
          sx={{
            width: "100%",

            overflowY: "auto",
            borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
            gap: "20px",

            display: "flex",
            fontSize: "3rem",
            color: "#ffffff",

            alignItems: "flex-start",
            fontWeight: "bold",
            padding: "20px 0px",
            flexDirection: "column",
            position: "relative",
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
                }}
              >
                <AvatarProfile
                  alt={item.user[0].name}
                  src={item.user[0].avatar}
                />
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
                gap: "10px",
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

              <Box
                sx={{
                  color: "#757474",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                }}
              >
                {convertTime(item.createdAt)}
              </Box>
            </Box>
          </Box>

          {/* Rep Comment */}
          {item.rep_comments.length > 0 &&
            item.rep_comments.map((item, i) => (
              <RepCommentItem
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
