import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useSelector } from "react-redux";
import AvatarUser from "../Homepage/AvatarUser";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import EndList from "../Homepage/EndList";
const LatestPost = () => {
  const activityPosts = useSelector((state) => state.postActivity);
  return (
    <>
      <Box
        sx={{
          padding: "30px 0px",
          borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",

              paddingBottom: "20px",
              color: (theme) => theme.palette.text.color.first,
            }}
          >
            ⌚ Bài viết gần đây
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.latestPost.background.first,
            borderRadius: "30px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px 0px",
            gap: "20px",
          }}
        >
          {/* {activityPosts.length === 0 && (
            <EndList msg={"Chưa có hoạt động nào 👏🏼"} />
          )} */}
          {activityPosts.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Link href={`/posts/${activityPosts[0]._id}`}>
                <Box
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    width: "250px",
                    height: "150px",
                    border: (theme) =>
                      `2px solid ${theme.palette.border.dialog}`,
                    backgroundColor: activityPosts[0].color
                      ? activityPosts[0].color
                      : "#ccc",

                    borderRadius: "30px",
                    overflow: "hidden",
                    display: "flex",
                    fontSize: "1.5rem",
                    color: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    padding: "20px",

                    "&:hover": {
                      border: (theme) =>
                        `2px solid ${theme.palette.border.dialogHover}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      WebkitMaskImage:
                        "linear-gradient(180deg,#000 60%,transparent)",
                      maskImage: "linear-gradient(180deg,#000 60%,transparent)",
                    }}
                  >
                    {activityPosts[0].title}
                  </Box>
                </Box>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",

                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",
                    flex: 1,
                    width: "100%",
                    gap: "10px",
                  }}
                >
                  <AvatarUser user={activityPosts[0].user[0]} />
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      width: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden !important",
                      textOverflow: "ellipsis",
                      color: (theme) => theme.palette.text.color.first,
                    }}
                  >
                    {activityPosts[0].user[0].name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          <Box>
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",

                paddingBottom: "20px",
                color: (theme) => theme.palette.text.color.active,
              }}
            >
              Xem tất cả
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default LatestPost;
