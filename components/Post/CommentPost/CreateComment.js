import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { memo, useEffect, useRef, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Oval } from "react-loading-icons";
import { toast } from "react-toastify";
import convertChat from "../../../utils/convertChat";
import Icon from "./Emotion/Icon";
import { useDispatch } from "react-redux";

import { getListCommentsLoading } from "../../../redux/actions/getListCommentsLoading";
const CreateComment = ({
  item,
  socket,
  setReplyComment,
  replyCommentData,
  createCommentBoxRef,
  setEditComment,
  editCommentData,
}) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const timeoutRef = useRef(null);
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);
  useEffect(() => {
    if (editCommentData) {
      setContent(editCommentData.content);
    }
  }, [editCommentData]);
  const ErrorContent = styled(Typography)({
    fontWeight: "400",
    fontSize: "1.7rem",
    lineHeight: 1.66,
    textAlign: "left",
    margin: "4px 14px 0 14px",
    color: "#f44336",
  });
  const handleClickCreateComment = async () => {
    try {
      if (content.length < 5) {
        return 0;
      }
      setIsLoading(true);
      if (editCommentData) {
        dispatch(getListCommentsLoading(editCommentData.commentId));
        if (editCommentData.type === "comment") {
          const res = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/edit/${editCommentData.commentId}`,
            {
              userId: session.user.id,
              content: convertChat(content),
            }
          );

          if (socket) {
            const data = {
              room: `post_${res.data.data.post[0]}`,
            };

            socket.emit("create-post-comment", data);
          }
        } else if (editCommentData.type === "rep_comment") {
          const res = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/reps/edit/${editCommentData.commentId}`,
            {
              userId: session.user.id,
              content: convertChat(content),
            }
          );

          if (socket) {
            const data = {
              room: `post_${res.data.data.comment[0].post[0]}`,
            };

            socket.emit("create-post-comment", data);
          }
        }
        dispatch(getListCommentsLoading(editCommentData.commentId));
        setEditComment("");
      } else if (replyCommentData) {
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/reps/${replyCommentData.commentId}`,
          {
            userId: session.user.id,
            content: convertChat(content),
          }
        );
        if (socket) {
          const data = {
            room: `post_${replyCommentData.postId}`,
          };
          console.log(data);
          socket.emit("create-post-comment", data);
        }
        setReplyComment("");
      } else {
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/${item._id}`,
          {
            userId: session.user.id,
            content: convertChat(content),
          }
        );

        if (socket) {
          const data = {
            room: `post_${item._id}`,
            commentId: res.data.data._id,
          };
          socket.emit("create-post-comment", data);
        }
      }
      setContent("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const handleChangeContent = (value) => {
    if (socket) {
      clearTimeout(timeoutRef.current);
      const data = {
        room: `post_${item._id}`,
        value: true,
      };
      socket.emit("typing-post-comment", data);
      timeoutRef.current = setTimeout(() => {
        const data = {
          room: `post_${item._id}`,
          value: false,
        };
        socket.emit("typing-post-comment", data);
      }, 1000);
    }
    setContent(value);
  };

  return (
    <>
      <Box
        ref={createCommentBoxRef}
        sx={{
          width: "100%",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        {editCommentData && (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              Đang chỉnh sửa cho: {editCommentData.content}
            </Typography>
            <Box
              as={motion.div}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setEditComment("")}
              sx={{
                cursor: "pointer",
                overflow: "hidden",
                backgroundColor: "#f7f7f7",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                padding: "5px",
                borderRadius: "10px",
                border: (theme) => `1px solid ${theme.palette.border.dialog}`,
                color: (theme) => theme.palette.text.color.second,
              }}
            >
              <RiCloseFill />
            </Box>
          </Box>
        )}
        {replyCommentData && (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              Đang trả lời cho {replyCommentData.name}:
              {replyCommentData.content}
            </Typography>
            <Box
              as={motion.div}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setReplyComment("")}
              sx={{
                cursor: "pointer",
                overflow: "hidden",
                backgroundColor: "#f7f7f7",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                padding: "5px",
                borderRadius: "10px",
                border: (theme) => `1px solid ${theme.palette.border.dialog}`,
                color: (theme) => theme.palette.text.color.second,
              }}
            >
              <RiCloseFill />
            </Box>
          </Box>
        )}

        <Box
          as={motion.div}
          sx={{
            width: "100%",
            pointerEvents: isLoading ? "none" : "visible",
            opacity: isLoading ? 0.6 : 1,
            overflowY: "auto",
            border: (theme) => `1px solid #128eff`,
            gap: "5px",
            borderRadius: "10px",
            display: "flex",
            fontSize: "3rem",
            color: "#ffffff",
            boxShadow: (theme) =>
              `0px 3px 10px 1px ${theme.palette.feeds.boxShadow}`,
            alignItems: "flex-start",
            fontWeight: "bold",
            padding: "20px",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: "50px",
              width: "100%",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.border.dialog}`,
            }}
          >
            <input
              style={{
                fontSize: "1.7rem",
                width: "100%",
                height: "100%",
                border: 0,
                outline: "none",
                backgroundColor: "inherit",
                color: content && content.length < 5 ? "red" : "",
              }}
              value={content}
              type="text"
              placeholder="Type comment"
              onChange={(e) => handleChangeContent(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              height: "50px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {content && content.length < 5 && (
              <ErrorContent>
                Vui lòng nhập nội dung từ 5 kí tự trở lên
              </ErrorContent>
            )}
            <Icon setContent={setContent} />
            <Button
              sx={{
                width: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                pointerEvents:
                  isLoading || content.length < 5 ? "none" : "visible",
                opacity: isLoading || content.length < 5 ? 0.6 : 1,
              }}
              onClick={() => handleClickCreateComment()}
            >
              {isLoading && (
                <>
                  <Oval width={20} />
                  Loading
                </>
              )}
              {!isLoading && <>Send</>}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default memo(CreateComment);
