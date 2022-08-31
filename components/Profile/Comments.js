import { Box, Button, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Item from "./Comment/Item";
const Comments = ({ account }) => {
  const [buttonLoadMore, setButtonLoadMore] = useState(false);
  const [dataComments, setDataComments] = useState([]);
  const currentPage = useRef(1);
  const [resultsOnPage, setResultsOnPage] = useState(20);
  const callDataApi = async (account) => {
    if (!account) {
      return null;
    }
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/get-all-comments/${account._id}?page=${currentPage.current}&pageSize=${resultsOnPage}`
    );
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-all-comments-detail-user", account],
    () => callDataApi(account),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: 0,
    }
  );
  const {
    data,
    isLoading,
    isFetching,
    isError: isErrorQuery,
    error,
  } = getListQuery;
  useEffect(() => {
    if (error && error.response) {
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);
  useEffect(() => {
    if (data && data.results >= 0) {
      if (data.results < resultsOnPage) {
        setButtonLoadMore(false);
      } else {
        setButtonLoadMore(true);
        currentPage.current = 2;
      }

      setDataComments(data.data);
    }
  }, [data]);
  const handleUpdateNewPage = async () => {
    try {
      const results = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/get-all-comments/${account._id}?page=${currentPage.current}&pageSize=${resultsOnPage}`
      );
      if (results.data.results < resultsOnPage) {
        setButtonLoadMore(false);
      } else {
        setButtonLoadMore(true);
        currentPage.current = currentPage.current + 1;
      }

      setDataComments((state) => [...state, ...results.data.data]);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",

          overflowX: "auto",
          border: (theme) => `1px solid ${theme.palette.border.dialog}`,
          backgroundColor: (theme) => theme.palette.latestPost.background.first,
          borderRadius: "5px",
        }}
      >
        {isLoading &&
          Array.from({ length: 5 }).map((item, i) => (
            <Box
              key={i}
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "100%",
                backgroundColor: (theme) =>
                  theme.palette.sidebar.background.default,
                border: (theme) => `2px solid ${theme.palette.border.dialog}`,
                gap: "0px",
                marginBottom: "10px",

                display: "flex",
                fontSize: "3rem",
                color: "#ffffff",

                alignItems: "flex-start",
                fontWeight: "bold",
                padding: "10px",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "flex-start",

                  flexDirection: "column",
                  width: "100%",
                }}
              >
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
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Skeleton animation="wave" width={100} height={30} />

                        <Skeleton animation="wave" width={70} height={20} />
                      </Box>
                      <Skeleton animation="wave" width={120} height={20} />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",

                    width: "100%",
                  }}
                >
                  <Skeleton animation="wave" width={200} height={20} />

                  <Skeleton animation="wave" width={50} height={50} />
                </Box>
              </Box>
            </Box>
          ))}
        {dataComments.length > 0 &&
          dataComments.map((item, i) => {
            return <Item key={item._id} item={item} account={account} />;
          })}
        {buttonLoadMore && !isFetching && (
          <Button
            sx={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",

              alignSelf: "center",
            }}
            onClick={() => handleUpdateNewPage()}
          >
            Load More
          </Button>
        )}
      </Box>
    </>
  );
};
export default Comments;
