import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Introduce from "../Homepage/Introduce";
import User from "./User";
const HomePage = () => {
  const { data: session, status } = useSession();

  const timeRefLoadingFeeds = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
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
        `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&results=100`
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

  const handleUpdateNewPage = async () => {
    try {
      console.log("hihi");
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts?sort=${filter}&page=${currentPage}&result=10`
      );

      setCurrentPage((prev) => prev + 1);

      setPosts([...posts, ...res.data.data]);
    } catch (err) {
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
    if (posts.length >= 0 && !isLoading) {
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
            Chats
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <Introduce />
          <User />
        </Box>
      </Box>
    </>
  );
};
export default HomePage;
