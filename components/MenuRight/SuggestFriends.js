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
import Item from "../SuggestFriend/Item";

const SuggestFriends = () => {
  const requestApiRef = useRef(null);

  const { data: session, status } = useSession();

  const [suggestionFriends, setSuggestionFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  useEffect(() => {
    if (status === "authenticated" && !requestApiRef.current) {
      requestApiRef.current = getSuggestionFriends();
    }
  }, [status]);

  const getSuggestionFriends = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/suggestion-friends`
      );
      setIsLoading(false);
      setSuggestionFriends(res.data.data);
      return "ok";
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
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
            Suggestions for you
          </Typography>
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",

              paddingBottom: "20px",
              color: (theme) => theme.palette.text.color.active,
            }}
          >
            See all
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((item, i) => (
                <Box
                  key={i}
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
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      height={40}
                      width={40}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={100}
                        height={20}
                      />
                      <Skeleton animation="wave" width={50} height={20} />
                    </Box>
                  </Box>
                  <Skeleton animation="wave" width={50} height={20} />
                </Box>
              ))}
            </>
          )}
          {!isLoading &&
            suggestionFriends &&
            suggestionFriends.length > 0 &&
            suggestionFriends.map((item, i) => <Item key={i} item={item} />)}
        </Box>
      </Box>
    </>
  );
};
export default SuggestFriends;
