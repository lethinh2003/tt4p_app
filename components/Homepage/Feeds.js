import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Oval } from "react-loading-icons";
import { toast } from "react-toastify";
import Item from "../Feeds/Item";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loading-icons";

const Feeds = ({ session, status }) => {
  const [buttonLoadmore, setButtonLoadmore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsOnPage, setResultsOnPage] = useState(6);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
  const callDataApi = async () => {
    setCurrentPage(1);
    setButtonLoadmore(true);

    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&pageSize=${resultsOnPage}`
    );
    return results.data;
  };
  const getListQuery = useQuery("get-all-posts", callDataApi, {
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
    if (data && data.results) {
      setPosts(data.data);
      if (data.results < resultsOnPage) {
        setButtonLoadmore(false);
      } else {
        if (filter === "following" || filter === "popular") {
          setCurrentPage((prev) => prev + 1);
        }
        console.log("hehe");
        setButtonLoadmore(true);
      }
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, [filter]);

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      setCurrentPage(1);
      let res;

      res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&pageSize=${resultsOnPage}`
      );

      if (res.data.results < resultsOnPage) {
        setButtonLoadmore(false);
      } else {
        if (filter === "following" || filter === "popular") {
          setCurrentPage((prev) => prev + 1);
        }
        setButtonLoadmore(true);
      }

      setIsLoading(false);
      setPosts(res.data.data);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleUpdateNewPage = async () => {
    try {
      setIsLoadingLoadMore(true);
      let res;
      if (filter === "latest" || filter === "all") {
        res = await axios.get(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&postId=${
            posts[posts.length - 1]._id
          }&pageSize=${resultsOnPage}`
        );
      } else {
        res = await axios.get(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&page=${currentPage}&pageSize=${resultsOnPage}`
        );
      }

      if (res.data.results < resultsOnPage) {
        setButtonLoadmore(false);
      } else {
        if (filter === "following" || filter === "popular") {
          setCurrentPage((prev) => prev + 1);
        }
        setButtonLoadmore(true);
      }
      setPosts([...posts, ...res.data.data]);
      setIsLoadingLoadMore(false);
    } catch (err) {
      setIsLoadingLoadMore(false);
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
    if (posts.length >= 0 && !isFetching) {
      setFilter(key);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
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
                as={motion.div}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleClickFilter(item.key)}
                className={item.key === filter ? "active" : null}
              >
                {item.title}
              </TitleFeeds>
            ))}
          </Box>
        </Box>
        {isFetching && (
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <ThreeDots fill="#06bcee" width={30} />
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0,1fr))",
              md: "repeat(2, minmax(0,1fr))",
            },
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
                        `0px 3px 20px 6px ${theme.palette.feeds.boxShadow}`,
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
            posts.map((item, i) => <Item key={item._id} i={i} item={item} />)}
        </Box>
        {buttonLoadmore && (
          <Button
            sx={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              pointerEvents: isLoadingLoadMore ? "none" : "visible",
              opacity: isLoadingLoadMore ? 0.6 : 1,
              alignSelf: "center",
            }}
            onClick={() => handleUpdateNewPage()}
          >
            {isLoadingLoadMore && (
              <>
                <Oval width={20} />
                Loading
              </>
            )}
            {!isLoadingLoadMore && <>Load more</>}
          </Button>
        )}
      </Box>
    </>
  );
};
export default Feeds;
