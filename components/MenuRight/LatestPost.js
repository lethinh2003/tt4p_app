import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useSelector } from "react-redux";
import AvatarUser from "../Homepage/AvatarUser";
import { motion } from "framer-motion";
import { memo } from "react";
import EndList from "../Homepage/EndList";
const LatestPost = () => {
  const latestActivityPost = useSelector((state) => state.postActivity);

  return (
    <>
      <Box
        sx={{
          padding: "30px 0px",
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
            ⌚ Hoạt động gần đây
          </Typography>
        </Box>
        <Box
          sx={{
            border: (theme) => `3px solid ${theme.palette.border.feeds}`,
            backgroundColor: "#f5f9ff",
            borderRadius: "30px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px 0px",
            gap: "20px",
            boxShadow: (theme) =>
              `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
          }}
        >
          {!latestActivityPost && <EndList msg={"Chưa có hoạt động nào 👏🏼"} />}
          {latestActivityPost && (
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Link href={`/posts/${latestActivityPost.slug}`}>
                <Box
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    width: "250px",
                    height: "150px",
                    border: (theme) =>
                      `3px solid ${theme.palette.border.feeds}`,
                    backgroundColor: latestActivityPost.color
                      ? latestActivityPost.color
                      : "#ccc",
                    boxShadow: (theme) =>
                      `0px 3px 20px 6px ${theme.palette.feeds.boxShadow}`,

                    borderRadius: "30px",
                    overflow: "hidden",
                    display: "flex",
                    fontSize: "1.5rem",
                    color: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    padding: "20px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      overflow: "auto",
                    }}
                  >
                    {latestActivityPost.title}
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
                  <AvatarUser user={latestActivityPost.user[0]} />
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "bold",
                      width: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden !important",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {latestActivityPost.user[0].name}
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
