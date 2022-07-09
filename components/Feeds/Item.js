import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import AvatarUser from "../Homepage/AvatarUser";
import ItemHearts from "./ItemHearts";
const Item = ({ item, i, socket }) => {
  const timeoutRef = useRef(null);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 200 * i);
    return () => {
      clearTimeout(timeoutRef.current.current);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Link href={`/posts/${item.slug}`}>
          <Box
            sx={{
              textAlign: "center",
              cursor: "pointer",
              height: "250px",
              overflowWrap: "break-word",
              border: (theme) => `3px solid ${theme.palette.border.feeds}`,
              backgroundColor: item.color ? item.color : "#ccc",
              borderRadius: "30px",

              boxShadow: (theme) =>
                `0px 3px 20px 6px ${theme.palette.feeds.boxShadow}`,

              fontSize: "3rem",
              color: "#ffffff",

              fontWeight: "bold",
              padding: "20px",
              // filter: isLoading ? "blur(5px)" : "blur(0px)",
              // pointerEvents: isLoading ? "none" : "visible",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
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
              flex: 1,
              width: "100%",
              gap: "10px",
            }}
          >
            <AvatarUser user={item.user[0]} />

            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                width: "200px",
                whiteSpace: "nowrap",
                overflow: "hidden !important",
                textOverflow: "ellipsis",
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
export default Item;
