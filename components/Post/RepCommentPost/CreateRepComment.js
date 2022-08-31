import InputUnstyled from "@mui/base/InputUnstyled";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { memo, useEffect, useRef, useState } from "react";
import { Oval } from "react-loading-icons";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import convertChat from "../../../utils/convertChat";
import Icon from "../CommentPost/Emotion/Icon";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
    width: 100%;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
  
    &:hover {
   
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[100]
      };
    }
  `
);

const StyledTextareaElement = styled("textarea")(
  ({ theme }) => `
    width: 100%;
    font-size: 2rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background-color: ${theme.palette.mode === "dark" ? "#0e1217" : "#ffffff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
  
    &:hover {
   
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[100]
      };
    }
  `
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{
        Input: StyledInputElement,
        Textarea: StyledTextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

const CreateRepComment = ({
  setIsClickRepComment,
  item,
  socket,
  setReplyCommentData,
  replyCommentData,
}) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const timeoutRef = useRef(null);
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const ErrorContent = styled(Typography)({
    fontWeight: "400",
    fontSize: "1.25rem",
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
      if (replyCommentData) {
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/reps/${replyCommentData.commentId}`,
          {
            userId: session.user.id,
            content: convertChat(content),
            postId: item.post[0]._id,
          }
        );
        if (session.user.id != item.user[0]._id) {
          const sendNotify = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies`,
            {
              user_send: session.user.id,
              user_receive: item.user[0]._id,
              post: item.post[0]._id,
              post_comment: res.data.data._id,
              type: "rep_comment_post",
              content: `${session.user.account} đã phản hồi bình luận của bạn!`,
            }
          );
          socket.emit("inc-notify-number", {
            account: item.user[0].account,
            number: 1,
          });
        }
        if (item.rep_comments.length > 0) {
          let listSendNoti = [];
          let listSendNotiUserId = [];
          let listSendNotiUserAccount = [];
          item.rep_comments.forEach((itemm, i) => {
            if (
              itemm.user[0]._id != session.user.id &&
              !listSendNotiUserId.includes(itemm.user[0]._id)
            ) {
              listSendNotiUserId.push(itemm.user[0]._id);
              listSendNotiUserAccount.push(itemm.user[0].account);
              listSendNoti.push(
                axios.post(
                  `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies`,
                  {
                    user_send: session.user.id,
                    user_receive: itemm.user[0]._id,
                    post: item.post[0]._id,
                    post_comment: res.data.data._id,
                    type: "rep_comment_post",
                    content: `${session.user.account} cũng đã phản hồi bình luận của ${item.user[0].account}!`,
                  }
                )
              );
            }
          });
          await Promise.all(listSendNoti);
          listSendNotiUserAccount.forEach((item) => {
            socket.emit("inc-notify-number", {
              account: item,
              number: 1,
            });
          });
        }

        if (socket) {
          const data = {
            room: `post_comment_${res.data.data.parent_comment}`,
            parentComment: res.data.data.parent_comment,
          };
          socket.emit("create-new-post-rep-comment", data, (res) => {
            if (res.status === "ok") {
              setIsLoading(false);
              setReplyCommentData("");
              setIsClickRepComment(false);
            } else {
              toast.error("Lỗi hệ thống");
              setIsLoading(false);
            }
          });
        }
      }
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
        sx={{
          marginLeft: "60px",
          width: "100%",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          position: "relative",
          borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
          "&::after": {
            top: "0px",
            backgroundColor: "#a1acb9",
            left: "-10px",
            width: "1px",
            height: "calc(100%)",
            position: "absolute",

            content: '""',
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            pointerEvents: isLoading ? "none" : "visible",
            opacity: isLoading ? 0.6 : 1,
            overflowY: "auto",

            gap: "5px",
            borderRadius: "10px",
            display: "flex",
            fontSize: "3rem",
            color: "#ffffff",

            alignItems: "flex-start",
            fontWeight: "bold",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <CustomInput
              multiline
              sx={{
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
              placeholder="Bạn đang nghĩ gì?"
              onChange={(e) => handleChangeContent(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
            }}
          >
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
                  <Oval width={15} />
                  Loading
                </>
              )}
              {!isLoading && <>Reply</>}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default memo(CreateRepComment);
