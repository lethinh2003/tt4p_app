import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AvatarUser from "../Homepage/AvatarUser";
import Overview from "./Overview";
import Posts from "./Posts";
import Activities from "./Activities";
import Comments from "./Comments";
import { useSession } from "next-auth/react";
import Followings from "./Followings";
import Followers from "./Followers";
import Link from "next/link";
import Settings from "./Settings";
import ButtonChangeAvatar from "./ChangeAvatar/ButtonChangeAvatar";
const Profile = ({ account, socket }) => {
  const { data: session } = useSession();
  const [key, setKey] = useState("posts");
  const callDataApi = async (account) => {
    if (!account || !socket) {
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
              backgroundColor: (theme) =>
                theme.palette.latestPost.background.first,
              border: (theme) => `1px solid ${theme.palette.border.dialog}`,
              borderRadius: "5px",
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
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
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
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.color.first,
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
              padding: "0 10px",
              border: (theme) => `1px solid ${theme.palette.border.dialog}`,
              backgroundColor: (theme) =>
                theme.palette.latestPost.background.first,
              overflowX: "auto",
              borderRadius: "5px",
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
                    color:
                      key === item.key
                        ? "#0079D3"
                        : (theme) => theme.palette.text.color.first,
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
            {session.user.account === data.data.account && (
              <>
                <Box
                  onClick={() => handClick("activities")}
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
                      color:
                        key === "activities"
                          ? "#0079D3"
                          : (theme) => theme.palette.text.color.first,
                      borderBottom:
                        key === "activities" ? "2px solid #0079D3" : null,
                      padding: "10px 0px",
                      textTransform: "uppercase",
                      "&:hover": {
                        color: "#0079D3",
                      },
                    }}
                  >
                    Acitivies
                  </Typography>
                </Box>
                <Box
                  onClick={() => handClick("settings")}
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
                      color:
                        key === "settings"
                          ? "#0079D3"
                          : (theme) => theme.palette.text.color.first,
                      borderBottom:
                        key === "settings" ? "2px solid #0079D3" : null,
                      padding: "10px 0px",
                      textTransform: "uppercase",
                      "&:hover": {
                        color: "#0079D3",
                      },
                    }}
                  >
                    Settings
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          {key === "overview" && <Overview account={data.data} />}
          {key === "posts" && <Posts account={data.data} />}
          {key === "activities" && <Activities account={data.data} />}
          {key === "comments" && <Comments account={data.data} />}
          {key === "followings" && <Followings account={data.data} />}
          {key === "followers" && <Followers account={data.data} />}
          {key === "settings" && <Settings account={data.data} />}
        </>
      )}
    </>
  );
};
export default Profile;
