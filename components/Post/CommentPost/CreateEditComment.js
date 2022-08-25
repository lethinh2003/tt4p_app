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
import Icon from "./Emotion/Icon";
import { _listCommentsLoading } from "../../../redux/actions/_listCommentsLoading";
import {
  ADD_ITEM_LIST_COMMENTS_LOADING,
  REMOVE_ITEM_LIST_COMMENTS_LOADING,
} from "../../../redux/actions/constants";
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

const CreateEditComment = ({
  setIsClickEditComment,
  item,
  socket,
  setEditCommentData,
  editCommentData,
}) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(editCommentData.content);
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
  const handleClickEditComment = async () => {
    try {
      if (content.length < 5) {
        return 0;
      }
      if (editCommentData) {
        setIsLoading(true);
        dispatch(
          _listCommentsLoading({
            type: ADD_ITEM_LIST_COMMENTS_LOADING,
            data: editCommentData.commentId,
          })
        );
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/edit/${editCommentData.commentId}`,
          {
            userId: session.user.id,
            content: convertChat(content),
          }
        );

        if (socket) {
          const data = {
            room: `post_comment_${editCommentData.commentId}`,
            commentId: editCommentData.commentId,
            newContent: convertChat(content),
          };
          socket.emit("update-edit-post-comment", data, (res) => {
            if (res.status === "ok") {
              setEditCommentData("");
              setIsClickEditComment(false);
            } else {
              toast.error("Lỗi hệ thống");
            }
            setIsLoading(false);
            dispatch(
              _listCommentsLoading({
                type: REMOVE_ITEM_LIST_COMMENTS_LOADING,
                data: editCommentData.commentId,
              })
            );
          });
        }
      }
    } catch (err) {
      dispatch(
        _listCommentsLoading({
          type: REMOVE_ITEM_LIST_COMMENTS_LOADING,
          data: editCommentData.commentId,
        })
      );

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
          width: "100%",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
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
              onClick={() => handleClickEditComment()}
            >
              {isLoading && (
                <>
                  <Oval width={15} />
                  Loading
                </>
              )}
              {!isLoading && <>Edit</>}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default memo(CreateEditComment);
