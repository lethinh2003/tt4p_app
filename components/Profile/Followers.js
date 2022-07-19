import { Box, Button, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Item from "./Followers/Item";
import { useSession } from "next-auth/react";
const Followers = ({ account }) => {
  const { data: session } = useSession();
  const [buttonLoadMore, setButtonLoadMore] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const currentPage = useRef(1);
  const [resultsOnPage, setResultsOnPage] = useState(20);
  const callDataApi = async (account) => {
    if (!account) {
      return null;
    }
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/users/get-all-followers/${account._id}?page=${currentPage.current}&pageSize=${resultsOnPage}`
    );
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-all-followers-detail-user", account],
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
    if (data) {
      if (data.results < resultsOnPage) {
        setButtonLoadMore(false);
      } else {
        setButtonLoadMore(true);
        currentPage.current = 2;
      }

      setDataUsers(data.data);
    }
  }, [data]);
  const handleUpdateNewPage = async () => {
    try {
      const results = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/get-all-followers/${account._id}?page=${currentPage.current}&pageSize=${resultsOnPage}`
      );
      if (results.data.results < resultsOnPage) {
        setButtonLoadMore(false);
      } else {
        setButtonLoadMore(true);
        currentPage.current = currentPage.current + 1;
      }

      setDataUsers((state) => [...state, ...results.data.data]);
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
          gap: "30px",
          overflowX: "auto",
          border: "1px solid #ccc",
          backgroundColor: "#ffffff",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0,1fr))",
              sm: "repeat(2, minmax(0,1fr))",
              md: "repeat(1, minmax(0,1fr))",
              lg: "repeat(2, minmax(0,1fr))",
              xl: "repeat(2, minmax(0,1fr))",
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
            dataUsers.length > 0 &&
            dataUsers.map((item, i) => (
              <Item
                key={item._id}
                item={item}
                session={session}
                account={account}
              />
            ))}
        </Box>

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
export default Followers;
