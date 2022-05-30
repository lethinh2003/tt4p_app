import {
  Box,
  Switch,
  Typography,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { memo } from "react";
import { Oval } from "react-loading-icons";
import { useSelector } from "react-redux";

const Item = ({ item, key }) => {
  const dataUser = useSelector((state) => state.user.data);

  const timeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollows, setIsFollows] = useState(false);

  const [message, setMessage] = useState("Follow");
  useEffect(() => {
    if (dataUser) {
      const listFollowings = dataUser.data.following;
      if (listFollowings.includes(item._id)) {
        setIsFollows(true);
      }
    }
  }, [dataUser]);
  useEffect(() => {
    if (isFollows) {
      setMessage("Unfollow");
    }
  }, [isFollows]);

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  const handleClickFollow = async (item) => {
    try {
      setMessage("Loading");
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/follows`,
        {
          userId: item._id,
        }
      );
      if (res.data.code === 1) {
        setMessage("Unfollow");
      } else {
        setMessage("Follow");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      {item._id !== dataUser.data._id && (
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
            <AvatarProfile alt="Remy Sharp" src={item.avatar} />
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
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                @{item.account}
              </Typography>
            </Box>
          </Box>
          <Button
            sx={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              pointerEvents: isLoading ? "none" : "visible",
              opacity: isLoading ? 0.6 : 1,
            }}
            onClick={() => handleClickFollow(item)}
          >
            {isLoading && (
              <>
                <Oval width={20} />
              </>
            )}
            {message}
          </Button>
        </Box>
      )}
    </>
  );
};
export default Item;
