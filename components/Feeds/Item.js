import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import AvatarUser from "../Homepage/AvatarUser";
import ItemHearts from "./ItemHearts";
import { memo } from "react";
const Item = ({ item, socket }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Link href={`/posts/${item._id}`}>
          <Box
            sx={{
              textAlign: "center",
              cursor: "pointer",
              height: "250px",
              overflowWrap: "break-word",
              border: (theme) => `2px solid ${theme.palette.border.dialog}`,
              backgroundColor: item.color ? item.color : "#ccc",
              borderRadius: "30px",

              fontSize: "3rem",
              color: "#ffffff",

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
                WebkitMaskImage: "linear-gradient(180deg,#000 60%,transparent)",
                maskImage: "linear-gradient(180deg,#000 60%,transparent)",
              }}
            >
              <Box>{item.title}</Box>
            </Box>
          </Box>
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              gap: "10px",
            }}
          >
            <AvatarUser user={item.user[0]} />

            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                maxWidth: "90px",
                whiteSpace: "nowrap",
                overflow: "hidden !important",
                textOverflow: "ellipsis",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              {item.user[0].name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              fontSize: "2rem",
              height: "100%",
              fontWeight: "bold",
              color: (theme) => theme.palette.text.color.second,
            }}
          >
            <ItemHearts
              item={item}
              session={session}
              status={status}
              socket={socket}
            />
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <AiFillMessage
                style={{
                  fontSize: "3rem",
                }}
              />
              {item.comments.length}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default memo(Item);
