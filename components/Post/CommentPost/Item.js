import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkIsCommentLoading from "../../../utils/checkIsCommentLoading";
import convertChat from "../../../utils/convertChat";
import convertTime from "../../../utils/convertTime";
import AvatarUser from "../../Homepage/AvatarUser";
import CreateRepComment from "../RepCommentPost/CreateRepComment";
import CommentEmotion from "./CommentEmotion";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import CreateEditComment from "./CreateEditComment";
const Item = ({ isChildren, socket, item, setEditComment }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const listCommentsLoading = useSelector((state) => state.listCommentsLoading);
  const [replyCommentData, setReplyCommentData] = useState("");
  const [editCommentData, setEditCommentData] = useState("");

  const [isClickEditComment, setIsClickEditComment] = useState(false);
  const [isClickRepComment, setIsClickRepComment] = useState(false);

  const timeRef = useRef(null);
  const [dataItem, setDataItem] = useState(item);
  const [vanilaContent, setVanilaContent] = useState(item.content);
  const [elementsContent, setElementsContent] = useState(
    vanilaContent.split("\n")
  );
  const [hasChildren, setHasChildren] = useState(
    dataItem && dataItem.rep_comments.length
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenOption, setIsOpenOption] = useState(false);
  useEffect(() => {
    setElementsContent(vanilaContent.split("\n"));
  }, [vanilaContent]);
  useEffect(() => {
    if (socket && dataItem) {
      socket.emit("join-room-post-comment", dataItem._id);
      socket.on("create-new-post-rep-comment", (data) => {
        if (data._id === dataItem._id) {
          if (data.rep_comments.length > 0) {
            setHasChildren(true);
          }
          setDataItem(data);
          console.log(data);
        }
      });
      socket.on("update-edit-post-comment", (data) => {
        if (data.commentId === dataItem._id) {
          // setElementsContent(data.newContent.split("\n"));
          setVanilaContent(data.newContent);
          console.log(data);
        }
      });
      // socket.on("delete-post-rep-comment", (data) => {
      //   if (data.commentId === dataItem._id) {
      //     setDataItem("");
      //     console.log("hide");
      //   }
      // });
      // socket.on("create-rep-post-comment", (data) => {
      //   dispatch(
      //     _listPostComments({
      //       type: INSERT_POST_COMMENTS,
      //       data: [data.data],
      //     })
      //   );
      // });
      return () => {
        socket.emit("leave-room-post-comment", dataItem._id);
        socket.off("create-new-post-rep-comment");
        socket.off("create-rep-post-comment");

        // socket.off("delete-post-rep-comment");
      };
    }
  }, [socket]);
  useEffect(() => {
    const getCommentPost = document.querySelectorAll(".comment_post");
    for (let i = 0; i < getCommentPost.length; i++) {
      if (getCommentPost[i].lastChild.textContent === "0") {
        getCommentPost[i].lastChild.textContent = null;
      }
    }
  }, [dataItem]);

  useEffect(() => {
    if (checkIsCommentLoading(dataItem._id, listCommentsLoading)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [listCommentsLoading]);

  const setReplyComment = (data) => {
    setReplyCommentData(data);
  };
  return (
    <>
      {dataItem && (
        <Box
          className="comment_post"
          sx={{
            width: "100%",

            gap: isChildren ? "0px" : "0px",

            display: "flex",
            fontSize: "3rem",
            color: "#ffffff",

            alignItems: "flex-start",
            fontWeight: "bold",
            padding: isChildren ? "0px" : "20px 0px",
            flexDirection: "column",
            position: "relative",
            marginLeft: isChildren ? "30px" : "0px",
            opacity: isLoading ? 0.7 : 1,
            pointerEvents: isLoading ? "none" : "visible",
            "&::after": {
              top: !isChildren ? "60px" : "40px",
              backgroundColor: "#a1acb9",
              left: "20px",
              width: "2px",
              height: !isChildren
                ? "calc(100% - 40px - 20px - 20px)"
                : "calc(100% - 40px)",
              position: "absolute",

              content: '""',
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "flex-start",

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
                <AvatarUser
                  user={dataItem.user[0]}
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
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
                      {dataItem.user[0].name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "500",
                        color: (theme) => theme.palette.text.color.second,
                      }}
                    >
                      @{dataItem.user[0].account}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: (theme) => theme.palette.text.color.second,
                    }}
                  >
                    · {convertTime(dataItem.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                paddingLeft: "50px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  color: "#757474",
                  fontSize: "1.7rem",
                  fontWeight: 500,
                }}
              >
                {!isClickEditComment &&
                  elementsContent.map((item, i) => {
                    return <Typography key={i}>{convertChat(item)}</Typography>;
                  })}
                {isClickEditComment && (
                  <CreateEditComment
                    setIsClickEditComment={setIsClickEditComment}
                    item={item}
                    socket={socket}
                    editCommentData={editCommentData}
                    setEditCommentData={setEditCommentData}
                  />
                )}
              </Box>
              <Box
                sx={{
                  fontSize: "1.7rem",
                  display: "flex",

                  alignItems: "center",

                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                <CommentEmotion item={dataItem} socket={socket} />
                <ReplyComment
                  setReplyCommentData={setReplyCommentData}
                  setIsClickRepComment={setIsClickRepComment}
                  isClickRepComment={isClickRepComment}
                  item={dataItem}
                />
                {session.user.id === dataItem.user[0]._id && (
                  <>
                    <EditComment
                      vanilaContent={vanilaContent}
                      item={dataItem}
                      setIsClickEditComment={setIsClickEditComment}
                      isClickEditComment={isClickEditComment}
                      setEditCommentData={setEditCommentData}
                    />
                    <DeleteComment
                      setDataItem={setDataItem}
                      socket={socket}
                      item={dataItem}
                      setIsLoadingOption={setIsLoading}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Box>
          {isClickRepComment && (
            <CreateRepComment
              socket={socket}
              setReplyCommentData={setReplyCommentData}
              setIsClickRepComment={setIsClickRepComment}
              isClickRepComment={isClickRepComment}
              replyCommentData={replyCommentData}
              item={dataItem}
            />
          )}

          {/* Rep Comment */}
          {hasChildren &&
            dataItem.rep_comments.map((item, i) => (
              <Item
                isChildren={true}
                key={item._id}
                setReplyComment={setReplyComment}
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
