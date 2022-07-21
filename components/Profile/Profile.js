import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AvatarUser from "../Homepage/AvatarUser";
import Overview from "./Overview";
import Posts from "./Posts";
import Comments from "./Comments";
import { useSession } from "next-auth/react";
import Followings from "./Followings";
import Followers from "./Followers";
import Link from "next/link";
import ButtonChangeAvatar from "./ChangeAvatar/ButtonChangeAvatar";
const Profile = ({ account }) => {
  const { data: session } = useSession();
  const [key, setKey] = useState("posts");
  const callDataApi = async (account) => {
    if (!account && !session) {
      return null;
    }
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/users/${account}`
    );
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-detail-user", session, account],
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
      console.log(error);
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);
  const menuOption = [
    // {
    //   key: "overview",
    //   title: "overview",
    // },
    {
      key: "posts",
      title: "posts",
    },
    {
      key: "comments",
      title: "comments",
    },
    {
      key: "followings",
      title: "followings",
    },
    {
      key: "followers",
      title: "followers",
    },
  ];
  const handClick = (item) => {
    setKey(item);
  };

  return (
    <>
      {account && data && session && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              position: "relative",
              backgroundColor: "#ffffff",
              border: "1px solid #ccc",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100px",
                backgroundColor: "#33a8ff",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            ></Box>
            <Box
              sx={{
                position: "absolute",
                top: "70px",
                left: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  width: "150px",
                  height: "150px",
                }}
              >
                <AvatarUser
                  user={data.data}
                  sx={{
                    width: "150px",
                    height: "150px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                  }}
                >
                  {data.data.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: (theme) => theme.palette.text.color.second,
                  }}
                >
                  @{data.data.account}
                </Typography>
                {session.user.account === data.data.account && (
                  <ButtonChangeAvatar account={account} user={data.data} />
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "10px",
              border: "1px solid #ccc",
              padding: "0 10px",
              backgroundColor: "#ffffff",
              overflowX: "auto",
            }}
          >
            {menuOption.map((item, i) => (
              <Box
                onClick={() => handClick(item.key)}
                key={item.key}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    color: key === item.key ? "#0079D3" : "black",
                    borderBottom: key === item.key ? "2px solid #0079D3" : null,
                    padding: "10px 0px",
                    textTransform: "uppercase",
                    "&:hover": {
                      color: "#0079D3",
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
          {key === "overview" && <Overview account={data.data} />}
          {key === "posts" && <Posts account={data.data} />}
          {key === "comments" && <Comments account={data.data} />}
          {key === "followings" && <Followings account={data.data} />}
          {key === "followers" && <Followers account={data.data} />}
        </>
      )}
    </>
  );
};
export default Profile;
