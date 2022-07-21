import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AvatarUser from "../Homepage/AvatarUser";
const Overview = ({ account }) => {
  const [key, setKey] = useState("overview");
  const callDataApi = async (account) => {
    if (!account) {
      return null;
    }
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/users/${account}`
    );
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-detail-user", account],
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
  const menuOption = [
    {
      key: "overview",
      title: "overview",
    },
    {
      key: "posts",
      title: "posts",
    },
    {
      key: "comments",
      title: "comments",
    },
  ];

  return (
    <>
      {account && data && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              backgroundColor: "green",
            }}
          ></Box>
        </>
      )}
    </>
  );
};
export default Overview;
