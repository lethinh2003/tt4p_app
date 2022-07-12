import { Box, Button, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { memo, useContext, useEffect, useState } from "react";
import { VscEye, VscFlame, VscPreview, VscRocket } from "react-icons/vsc";
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SocketContext from "../../contexts/socket";
import {
  ADD_FEED_POSTS,
  INC_FEED_CURRENT_PAGE,
  SET_FEED_CATEGORY,
  SET_FEED_CURRENT_PAGE,
  SET_FEED_CURRENT_POSITION_SCROLL,
  SET_FEED_POSTS,
} from "../../redux/actions/constants";
import { _feedCategory } from "../../redux/actions/_feedCategory";
import {
  _feedCurrentPositionScroll,
  _feedPosts,
} from "../../redux/actions/_feedPosts";
import Item from "../Feeds/Item";
import EndList from "./EndList";

const Feeds = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const getGlobalCategory = useSelector((state) => state.feedCategory);
  const getFeedPosts = useSelector((state) => state.feedPosts);
  const getFeedCurrentPage = useSelector((state) => state.feedCurrentPage);
  const getFeedCurrentPositionScroll = useSelector(
    (state) => state.feedCurrentPositionScroll
  );
  const [buttonLoadmore, setButtonLoadmore] = useState(false);
  const [resultsOnPage, setResultsOnPage] = useState(10);
  const [filter, setFilter] = useState(getGlobalCategory);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);

  // useEffect(() => {
  //   const scrollEvent = () => {
  //     if (window.scrollY != 0) {
  //       dispatch(
  //         _feedCurrentPositionScroll({
  //           type: SET_FEED_CURRENT_POSITION_SCROLL,
  //           data: window.scrollY,
  //         })
  //       );
  //     }
  //   };
  //   window.addEventListener("scroll", scrollEvent);
  //   return () => {
  //     window.removeEventListener("scroll", scrollEvent);
  //   };
  // });
  useEffect(() => {
    if (getFeedPosts.length === 0) {
      getAPIFeedPosts();
    }
  }, []);
  // useEffect(() => {
  //   if (getFeedCurrentPositionScroll) {
  //     window.scroll(0, getFeedCurrentPositionScroll);
  //   }
  // }, []);

  useEffect(() => {
    if (filter !== getGlobalCategory) {
      dispatch(
        _feedPosts({
          type: SET_FEED_CURRENT_PAGE,
          data: 1,
        })
      );
      getAPIFeedPosts();
      dispatch(
        _feedCategory({
          type: SET_FEED_CATEGORY,
          data: filter,
        })
      );
    }
  }, [filter]);

  const getAPIFeedPosts = async () => {
    try {
      setIsLoading(true);
      const results = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&pageSize=${resultsOnPage}`
      );
      dispatch(
        _feedPosts({
          type: SET_FEED_POSTS,
          data: results.data.data,
        })
      );
      if (results.data.results < resultsOnPage) {
        setButtonLoadmore(false);
      } else {
        if (filter === "following" || filter === "popular") {
          dispatch(
            _feedPosts({
              type: INC_FEED_CURRENT_PAGE,
            })
          );
        }
        setButtonLoadmore(true);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("join-room-update-public-post");
    }
  }, [socket]);

  useEffect(() => {
    // refetch();
  }, [filter]);

  const handleUpdateNewPage = async () => {
    try {
      setIsLoadingLoadMore(true);
      let res;
      if (filter === "latest" || filter === "all") {
        res = await axios.get(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&postId=${
            getFeedPosts[getFeedPosts.length - 1]._id
          }&pageSize=${resultsOnPage}`
        );
      } else {
        res = await axios.get(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&page=${getFeedCurrentPage}&pageSize=${resultsOnPage}`
        );
      }

      if (res.data.results < resultsOnPage) {
        setButtonLoadmore(false);
      } else {
        if (filter === "following" || filter === "popular") {
          dispatch(
            _feedPosts({
              type: INC_FEED_CURRENT_PAGE,
            })
          );
        }
        setButtonLoadmore(true);
      }
      dispatch(
        _feedPosts({
          type: ADD_FEED_POSTS,
          data: res.data.data,
        })
      );

      setIsLoadingLoadMore(false);
    } catch (err) {
      setIsLoadingLoadMore(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const category = [
    {
      title: "All",
      key: "all",
      icon: <VscRocket />,
    },
    {
      title: "Following",
      key: "following",
      icon: <VscEye />,
    },
    {
      title: "Latest",
      key: "latest",
      icon: <VscFlame />,
    },
    {
      title: "Popular",
      key: "popular",
      icon: <VscPreview />,
    },
  ];
  const TitleFeeds = styled(Typography)(({ theme }) => ({
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: theme.palette.text.color.second,
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "8px",
    borderRadius: "15px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e8ecf9",
    },
    "&:active": {
      backgroundColor: "#dbe1f5",
    },
    "&.active": {
      backgroundColor: "#dbe1f5",
      color: theme.palette.text.color.active,
    },
  }));
  const handleClickFilter = (key) => {
    if (!isLoading) {
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
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
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
              overflowX: "auto",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px" }}>
              {category.map((item, i) => (
                <TitleFeeds
                  key={i}
                  onClick={() => handleClickFilter(item.key)}
                  className={item.key === getGlobalCategory ? "active" : null}
                >
                  {item.icon}
                  {item.title}
                </TitleFeeds>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {/* {isFetching && <ThreeDots width={30} fill={"20b8fb"} />} */}
        </Box>

        <InfiniteScroll
          dataLength={getFeedPosts.length}
          next={handleUpdateNewPage}
          hasMore={buttonLoadmore}
          style={{
            overflow: "unset",
          }}
        >
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
              getFeedPosts.length > 0 &&
              getFeedPosts.map((item, i) => (
                <Item key={item._id} item={item} socket={socket} />
              ))}
          </Box>
        </InfiniteScroll>
        {!isLoading && getFeedPosts.length === 0 && (
          <EndList msg={"Chưa có bài viết nào 👏🏼"} />
        )}
        {buttonLoadmore && getFeedPosts.length > 0 && !isLoading && (
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
                <Oval width={15} />
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
export default memo(Feeds);
