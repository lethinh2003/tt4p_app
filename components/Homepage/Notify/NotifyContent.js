import { Box, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState, memo } from "react";
import Item from "./Item";
import { toast } from "react-toastify";
const NotifyContent = ({ session, socket }) => {
  //   const [isLoading, setIsLoading] = useState(false);
  const [dataNotify, setDataNotify] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitResults, setLimitResults] = useState(10);
  const callDataApi = async () => {
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/${session.user.id}?page=${currentPage}&pageSize=${limitResults}`
    );
    return results.data;
  };
  const getListQuery = useQuery("get-notifies-user", callDataApi, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
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
      setDataNotify(data.data);
    }
  }, [data]);

  return (
    <>
      <Box
        sx={{
          height: "200px",
          overflow: "scroll",
          backgroundColor: "#ffffff",
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
          dataNotify.length > 0 &&
          dataNotify.map((item, i) => <Item item={item} key={item._id} />)}
      </Box>
    </>
  );
};
export default memo(NotifyContent);
