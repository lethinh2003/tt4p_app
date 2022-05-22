import { Typography, Box, Skeleton, Button } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateComment from "./CommentPost/CreateComment";
import Item from "./CommentPost/Item";
import Loading from "./CommentPost/Loading";
import { Oval } from "react-loading-icons";

const CommentPost = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueFilter, setValueFilter] = useState("latest");
  const [dataComments, setDataComments] = useState([]);
  const [resultsNum, setResultsNum] = useState(5);
  const [resultsPage, setResultsPage] = useState(1);
  const { data: session, status } = useSession();

  const { item } = props;
  useEffect(() => {
    if (status === "authenticated") {
      getPostComments();
    }
  }, [valueFilter, resultsPage]);
  const getPostComments = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/${item._id}?sort=${valueFilter}&results=${resultsNum}&page=${resultsPage}`
      );
      if (resultsPage === 1) {
        setDataComments(res.data.data);
      } else {
        setDataComments((prev) => [...prev, ...res.data.data]);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const handleClickFilter = (value) => {
    if (!isLoading) {
      setValueFilter(value);
      setResultsPage(1);
    }
  };
  const handleClickLoadmore = () => {
    setResultsPage((prev) => prev + 1);
  };
  return (
    <>
      {item && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              Comments ({dataComments.length})
            </Typography>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#ffffff",
                fontSize: "1.7rem",
                fontWeight: "600",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "10px",
                border: (theme) => `1px solid ${theme.palette.border.dialog}`,
                color: (theme) => theme.palette.text.color.first,
                overflow: "hidden",
              }}
            >
              <Box
                onClick={() => handleClickFilter("latest")}
                sx={{
                  borderRight: (theme) =>
                    `1px solid ${theme.palette.border.dialog}`,
                  heigth: "100%",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    valueFilter === "latest" ? "#f7f7f7" : "inherit",
                }}
              >
                <Box
                  sx={{
                    padding: "7px",
                  }}
                >
                  Latest
                </Box>
              </Box>
              <Box
                onClick={() => handleClickFilter("popular")}
                sx={{
                  heigth: "100%",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    valueFilter === "popular" ? "#f7f7f7" : "inherit",
                }}
              >
                <Box
                  sx={{
                    padding: "7px",
                  }}
                >
                  Popular
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              overflowY: "auto",
              border: (theme) => `3px solid ${theme.palette.border.feeds}`,
              gap: "5px",
              borderRadius: "10px",

              boxShadow: (theme) =>
                `0px 3px 10px 1px ${theme.palette.feeds.boxShadow}`,
              display: "flex",
              fontSize: "3rem",
              color: "#ffffff",
              backgroundColor: "#ffffff",
              alignItems: "flex-start",
              fontWeight: "bold",
              padding: "20px",
              flexDirection: "column",
            }}
          >
            <CreateComment item={item} />
            {isLoading && (
              <>
                {Array.from({ length: 5 }).map((item, i) => (
                  <Loading key={i} />
                ))}
              </>
            )}
            {!isLoading &&
              dataComments.length > 0 &&
              dataComments.map((item, i) => <Item item={item} key={i} />)}
            <Button
              sx={{
                width: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                pointerEvents: isLoading ? "none" : "visible",
                opacity: isLoading ? 0.6 : 1,
              }}
              onClick={() => handleClickLoadmore()}
            >
              {isLoading && (
                <>
                  <Oval width={20} />
                  Loading
                </>
              )}
              {!isLoading && <>Load more</>}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
export default CommentPost;
