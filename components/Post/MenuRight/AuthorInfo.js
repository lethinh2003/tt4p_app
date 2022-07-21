import { Box, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import AvatarUser from "../../Homepage/AvatarUser";

const AuthorInfo = ({ user }) => {
  const [postsCount, setPostsCount] = useState(0);
  const callDataApi = async () => {
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/users/get-posts-count/${user._id}`
    );
    return results.data;
  };
  const getListQuery = useQuery("get-posts-count-by-user", callDataApi, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    manual: true,
  });
  const {
    data,
    isLoading,
    isFetching,
    isError: isErrorQuery,
    error,
    refetch,
  } = getListQuery;

  useEffect(() => {
    if (data) {
      setPostsCount(data.data);
    }
  }, [data]);

  return (
    <>
      {user && (
        <Box
          sx={{
            paddingBottom: "30px",
            borderBottom: "1px solid #52586666",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",

              color: (theme) => theme.palette.text.color.first,
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {user.sex === "boy" ? "👨🏻" : "👩🏻"} Thông tin cá nhân
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              width: "100%",
              gap: "10px",
            }}
          >
            <AvatarUser
              user={user}
              sx={{
                width: "100px",
                height: "100px",
              }}
            />
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,

                  textAlign: "center",
                }}
              >
                @{user.account}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,

                  textAlign: "center",
                }}
              >
                Tham gia lúc {dayjs(user.createdAt).format("DD/MM/YYYY")}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",
              alignItems: "center",

              width: "100%",
              gap: "10px",
            }}
          >
            {isFetching && (
              <Skeleton animation="wave" height={100} width={100} />
            )}
            {!isFetching && (
              <Box
                sx={{
                  boxShadow: (theme) =>
                    `0px 3px 20px 1px ${theme.palette.feeds.boxShadow}`,
                  backgroundColor: "#ccf1fa",
                  width: "100px",
                  alignItems: "center",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    color: "#464e5a",
                  }}
                >
                  Posts
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.color.first,
                  }}
                >
                  🗒️{postsCount}
                </Typography>
              </Box>
            )}
            {isFetching && (
              <Skeleton animation="wave" height={100} width={100} />
            )}
            {!isFetching && (
              <Box
                sx={{
                  boxShadow: (theme) =>
                    `0px 3px 20px 1px ${theme.palette.feeds.boxShadow}`,
                  backgroundColor: "#ccf1fa",
                  width: "100px",
                  alignItems: "center",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    color: "#464e5a",
                  }}
                >
                  Followers
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.color.first,
                  }}
                >
                  ✨ {user.followers.length}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default AuthorInfo;
