import { Box, Button, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Item from "../Homepage/Notify/Item";
const Notifies = ({ account }) => {
  const { data: session } = useSession();
  const [buttonLoadMore, setButtonLoadMore] = useState(false);
  const [dataNotifies, setDataNotifies] = useState([]);
  const currentPage = useRef(1);
  const [resultsOnPage, setResultsOnPage] = useState(20);

  const callDataApi = async (account) => {
    if (!account) {
      return null;
    }
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/${account._id}?page=${currentPage.current}&pageSize=${resultsOnPage}`
    );
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-notifies-user", account],
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
      const currentData = data.data;

      setDataNotifies(currentData);
    }
  }, [data]);

  const handleUpdateNewPage = async () => {
    try {
      const results = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/${account._id}?page=${currentPage.current}&pageSize=${resultsOnPage}`
      );
      if (results.data.results < resultsOnPage) {
        setButtonLoadMore(false);
      } else {
        setButtonLoadMore(true);
        currentPage.current = currentPage.current + 1;
      }
      const currentData = results.data.data;

      setDataNotifies((state) => [...state, ...currentData]);
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
          border: (theme) => `1px solid ${theme.palette.border.dialog}`,
          backgroundColor: (theme) => theme.palette.latestPost.background.first,
          borderRadius: "5px",
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
          {isLoading &&
            Array.from({ length: 5 }).map((item, i) => (
              <Box
                key={i}
                sx={{
                  marginBottom: "5px",
                  height: "100px",

                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="rectangular" width={"100%"} height={50} />
                </Box>
              </Box>
            ))}

          {!isLoading &&
            dataNotifies.length > 0 &&
            dataNotifies.map((item, i) => <Item key={item._id} item={item} />)}
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
export default Notifies;
