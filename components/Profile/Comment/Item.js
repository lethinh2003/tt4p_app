import { Box, Typography, Skeleton } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import convertChat from "../../../utils/convertChat";
import convertTime from "../../../utils/convertTime";
import DeleteComment from "./DeleteComment";
import { useSession } from "next-auth/react";

const Item = ({ isChildren, item, account }) => {
  const { data: session } = useSession();

  const [vanilaContent, setVanilaContent] = useState(item.content);
  const [elementsContent, setElementsContent] = useState(
    vanilaContent.split("\n")
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] = useState(false);
  useEffect(() => {
    setElementsContent(vanilaContent.split("\n"));
  }, [vanilaContent]);

  return (
    <>
      {!isHide && session && (
        <Box
          sx={{
            backgroundColor: "unset",
            padding: "10px",
          }}
        >
          <Box
            className="comment_post"
            sx={{
              cursor: "pointer",
              borderRadius: "10px",
              width: "100%",
              backgroundColor: (theme) =>
                theme.palette.sidebar.background.default,
              gap: isChildren ? "0px" : "0px",
              border: (theme) => `2px solid ${theme.palette.border.dialog}`,
              display: "flex",
              fontSize: "3rem",
              color: "#ffffff",

              alignItems: "flex-start",
              fontWeight: "bold",
              padding: "10px",
              flexDirection: "column",
              position: "relative",
              marginLeft: "0px",
              opacity: isLoading ? 0.5 : 1,
              pointerEvents: isLoading ? "none" : "visible",
              "&:hover": {
                border: (theme) =>
                  `2px solid ${theme.palette.border.dialogHover}`,
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
                          fontSize: "1.4rem",
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
                        fontSize: "1rem",
                        fontWeight: "500",
                        color: (theme) => theme.palette.text.color.second,
                      }}
                    >
                      · {convertTime(item.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",

                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    color: (theme) => theme.palette.text.color.first,
                    fontSize: "1.7rem",
                    fontWeight: 500,
                  }}
                >
                  {elementsContent.map((item, i) => {
                    return <Typography key={i}>{convertChat(item)}</Typography>;
                  })}
                </Box>
                {session.user.account === account.account && (
                  <Box
                    sx={{
                      fontSize: "1.7rem",
                      display: "flex",

                      alignItems: "center",

                      color: (theme) => theme.palette.text.color.second,
                    }}
                  >
                    <DeleteComment
                      setIsHide={setIsHide}
                      item={item}
                      key={item._id}
                      setIsLoading={setIsLoading}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default memo(Item);
