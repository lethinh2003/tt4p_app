import { BigHead } from "@bigheads/core";
import { Badge, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import checkIsCommentLoading from "../../../utils/checkIsCommentLoading";
import checkUserOnline from "../../../utils/checkUserOnline";
import convertChat from "../../../utils/convertChat";
import convertTime from "../../../utils/convertTime";
import CommentEmotion from "./CommentEmotion";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import CreateRepComment from "../RepCommentPost/CreateRepComment";
import { useDispatch } from "react-redux";
import { INSERT_POST_COMMENTS } from "../../../redux/actions/constants";
import { setPostComments } from "../../../redux/actions/setPostComments";
const Item = ({
  isChildren,
  socket,
  item,
  createCommentBoxRef,
  setEditComment,
}) => {
  // const hasChildren = item && item.rep_comments.length;
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const listCommentsLoading = useSelector((state) => state.listCommentsLoading);
  const listUsersOnline = useSelector((state) => state.usersOnline);
  const [replyCommentData, setReplyCommentData] = useState("");
  const [editCommentData, setEditCommentData] = useState("");

  const [isOnline, setIsOnline] = useState(false);
  const [isClickRepComment, setIsClickRepComment] = useState(false);

  const elementsContent = item.content.split("\n");
  const timeRef = useRef(null);
  const [dataItem, setDataItem] = useState(item);
  const [hasChildren, setHasChildren] = useState(
    dataItem && dataItem.rep_comments.length
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenOption, setIsOpenOption] = useState(false);
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
      // socket.on("delete-post-rep-comment", (data) => {
      //   if (data.commentId === dataItem._id) {
      //     setDataItem("");
      //     console.log("hide");
      //   }
      // });
      // socket.on("create-rep-post-comment", (data) => {
      //   dispatch(
      //     setPostComments({
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
    if (dataItem) {
      const checkOnline = checkUserOnline(dataItem.user[0], listUsersOnline);
      setIsOnline(checkOnline);
    }
  }, [listUsersOnline]);
  useEffect(() => {
    if (checkIsCommentLoading(dataItem._id, listCommentsLoading)) {
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

            // borderBottom: (theme) =>
            //   isChildren ? "unset" : `1px solid ${theme.palette.border.dialog}`,

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
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",

                      borderRadius: "50%",
                      position: "relative",
                      overflow: "hidden",
                      border: "2px solid #23303a",
                      boxShadow: "0px 3px 15px 0px #e1e1e1",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "40px",
                      }}
                    >
                      <BigHead
                        accessory={dataItem.user[0].avatarSVG.accessory}
                        body={dataItem.user[0].avatarSVG.body}
                        circleColor={dataItem.user[0].avatarSVG.circleColor}
                        clothing={dataItem.user[0].avatarSVG.clothing}
                        clothingColor={dataItem.user[0].avatarSVG.clothingColor}
                        eyebrows={dataItem.user[0].avatarSVG.eyebrows}
                        eyes={dataItem.user[0].avatarSVG.eyes}
                        faceMask={dataItem.user[0].avatarSVG.faceMask}
                        faceMaskColor={dataItem.user[0].avatarSVG.faceMaskColor}
                        facialHair={dataItem.user[0].avatarSVG.facialHair}
                        graphic={dataItem.user[0].avatarSVG.graphic}
                        hair={dataItem.user[0].avatarSVG.hair}
                        hairColor={dataItem.user[0].avatarSVG.hairColor}
                        hat={dataItem.user[0].avatarSVG.hat}
                        hatColor={dataItem.user[0].avatarSVG.hatColor}
                        lashes={dataItem.user[0].avatarSVG.lashes}
                        lipColor={dataItem.user[0].avatarSVG.lipColor}
                        mask={dataItem.user[0].avatarSVG.mask}
                        mouth={dataItem.user[0].avatarSVG.mouth}
                        skinTone={dataItem.user[0].avatarSVG.skinTone}
                      />
                    </Box>
                  </Box>
                </StyledBadge>
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
              }}
            >
              <Box
                sx={{
                  color: "#757474",
                  fontSize: "1.7rem",
                  fontWeight: 500,
                }}
              >
                {elementsContent.map((item, i) => {
                  return <Typography key={i}>{convertChat(item)}</Typography>;
                })}
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
                  setIsClickRepComment={setIsClickRepComment}
                  isClickRepComment={isClickRepComment}
                  createCommentBoxRef={createCommentBoxRef}
                  item={dataItem}
                  setReplyComment={setReplyComment}
                />
                {session.user.id === dataItem.user[0]._id && (
                  <>
                    <EditComment
                      item={dataItem}
                      createCommentBoxRef={createCommentBoxRef}
                      setEditComment={setEditComment}
                      setIsLoadingOption={setIsLoading}
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
              setIsClickRepComment={setIsClickRepComment}
              isClickRepComment={isClickRepComment}
              replyCommentData={replyCommentData}
              setReplyComment={setReplyComment}
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
