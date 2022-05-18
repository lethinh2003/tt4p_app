import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Item from "../Feeds/Item";

const Feeds = () => {
  const { data: session, status } = useSession();

  const timeRefLoadingFeeds = useRef(null);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      getAllPosts();
    }
    return () => clearTimeout(timeRefLoadingFeeds.current);
  }, [filter]);
  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}`
      );
      setIsLoading(false);
      setPosts(res.data.data);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  const category = [
    {
      title: "All",
      key: "all",
    },
    {
      title: "Following",
      key: "following",
    },
    {
      title: "Latest",
      key: "latest",
    },
    {
      title: "Popular",
      key: "popular",
    },
  ];
  const TitleFeeds = styled(Typography)(({ theme }) => ({
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: theme.palette.text.color.second,
    cursor: "pointer",
    "&.active": {
      color: theme.palette.text.color.active,
    },
  }));
  const handleClickFilter = (key) => {
    if (posts.length > 0 && !isLoading) {
      // clearTimeout(timeRefLoadingFeeds.current);
      // const coppyPosts = [...posts];
      // if (key === "popular") {
      //   coppyPosts.sort((a, b) => b.hearts.length - a.hearts.length);
      //   console.log(coppyPosts);
      // } else if (key === "latest") {
      //   coppyPosts.sort(
      //     (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      //   );
      //   console.log(coppyPosts);
      // } else if (key === "all") {
      //   coppyPosts.sort(
      //     (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
      //   );
      //   console.log(coppyPosts);
      // }
      // setIsLoading(true);
      // timeRefLoadingFeeds.current = setTimeout(() => {
      //   setIsLoading(false);
      //   setPosts(coppyPosts);
      // }, 1000);
      setFilter(key);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "calc(100% - 60px)",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
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
              color: (theme) => theme.palette.text.color.first,
            }}
          >
            Feeds
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            {category.map((item, i) => (
              <TitleFeeds
                key={i}
                onClick={() => handleClickFilter(item.key)}
                className={item.key === filter ? "active" : null}
              >
                {item.title}
              </TitleFeeds>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "30px",
          }}
        >
          {isLoading && (
            <>
              {Array.from({ length: 5 }).map((item, i) => (
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
                      border: (theme) =>
                        `3px solid ${theme.palette.border.feeds}`,

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
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      height={"100%"}
                      width={"100%"}
                    />
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
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        height={40}
                        width={40}
                      />

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
                        <Skeleton animation="wave" width={100} height={20} />
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        fontSize: "1.7rem",
                        height: "100%",
                        fontWeight: "bold",
                        color: (theme) => theme.palette.text.color.second,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          height={20}
                          width={20}
                        />
                        <Skeleton animation="wave" width={50} height={20} />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          height={20}
                          width={20}
                        />
                        <Skeleton animation="wave" width={50} height={20} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </>
          )}
          {!isLoading &&
            posts.length > 0 &&
            posts.map((item, i) => <Item key={i} item={item} />)}
        </Box>
      </Box>
    </>
  );
};
export default Feeds;
