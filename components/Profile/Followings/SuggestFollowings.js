import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState, memo } from "react";
import { useQuery } from "react-query";
import Item from "../../SuggestFriend/Item";
import { useContext } from "react";
import SocketContext from "../../../contexts/socket";
import { useSession } from "next-auth/react";

const SuggestFollowings = ({ account }) => {
  const { data: session, status } = useSession();

  const socket = useContext(SocketContext);
  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));
  const callDataApi = async (session) => {
    if (session) {
      const results = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/suggestion-friends/${session.user.id}?results=5`
      );
      return results.data;
    } else {
      return null;
    }
  };
  const getListQuery = useQuery(
    ["get-suggest-friends-following", account, session],
    () => callDataApi(session),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  const {
    data: suggestionFriends,
    isLoading,
    isFetching,
    isError: isErrorQuery,
    error,
  } = getListQuery;

  return (
    <>
      <Box
        sx={{
          width: "100%",
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
            ↗️ Đề xuất theo dõi
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
            suggestionFriends.data &&
            suggestionFriends.data.length > 0 &&
            suggestionFriends.data.map((item, i) => (
              <Item
                key={item._id}
                item={item}
                session={session}
                socket={socket}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};
export default memo(SuggestFollowings);
