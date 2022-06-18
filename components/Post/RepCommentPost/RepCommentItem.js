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
            }}
          >
            <AvatarProfile alt={item.user[0].name} src={item.user[0].avatar} />
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
    </>
  );
};
export default memo(RepCommentItem);
