import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { RiHeartsFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import ItemHearts from "./ItemHearts";

const Item = ({ item, i }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  return (
    <>
      <Box
        key={i}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            height: "250px",
            border: (theme) => `3px solid ${theme.palette.border.feeds}`,
            backgroundColor: item.color ? item.color : "#ccc",
            borderRadius: "30px",
            overflow: "hidden",
            boxShadow: (theme) =>
              `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
            display: "flex",
            fontSize: "3rem",
            color: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            padding: "20px",
          }}
        >
          {item.content}
          {/* <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    alt="Mountains"
                    src={`https://source.unsplash.com/random`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div> */}
        </Box>
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
            <AvatarProfile alt={item.user[0].name} src={item.user[0].avatar} />
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                width: "100px",
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
            <ItemHearts item={item} />
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