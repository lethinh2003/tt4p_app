import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostActivity } from "../../redux/actions/getPostActivity";

const LatestPost = ({ session, status }) => {
  const requestApiRef = useRef(null);

  const dispatch = useDispatch();
  const dataActivityPost = useSelector((state) => state.postActivity.data);
  const [latestActivityPost, setLatestActivityPost] = useState(
    dataActivityPost && dataActivityPost.data
      ? dataActivityPost.data.slice(0, 1)[0]
      : null
  );
  const requestingGetActivityPost = useSelector(
    (state) => state.postActivity.requesting
  );

  const errorGetActivityPost = useSelector((state) => state.postActivity.error);
  const errorMessageGetActivityPost = useSelector(
    (state) => state.postActivity.message
  );

  useEffect(() => {
    if (!dataActivityPost && !requestApiRef.current) {
      requestApiRef.current = dispatch(getPostActivity(session.user.id));
    }
  }, []);

  useEffect(() => {
    if (dataActivityPost && dataActivityPost.data.length > 0) {
      const getLatestActivity = dataActivityPost.data.slice(0, 1);
      setLatestActivityPost(getLatestActivity[0]);
    }
  }, [dataActivityPost]);

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  return (
    <>
      <Box
        sx={{
          padding: "30px 0px",
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

              paddingBottom: "20px",
              color: (theme) => theme.palette.text.color.first,
            }}
          >
            Latest Post Activity
          </Typography>
        </Box>
        <Box
          sx={{
            border: (theme) => `3px solid ${theme.palette.border.feeds}`,
            backgroundColor: "#f5f9ff",
            borderRadius: "30px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px 0px",
            gap: "20px",
            boxShadow: (theme) =>
              `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
          }}
        >
          {requestingGetActivityPost && (
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "150px",
                  height: "120px",
                  border: (theme) => `3px solid ${theme.palette.border.feeds}`,

                  boxShadow: (theme) =>
                    `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,

                  borderRadius: "30px",
                  overflow: "hidden",
                  display: "flex",
                  fontSize: "1.5rem",
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
                  flexDirection: "column",
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
                    <Skeleton animation="wave" width={20} height={20} />
                    <Skeleton animation="wave" width={20} height={20} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton animation="wave" width={20} height={20} />
                    <Skeleton animation="wave" width={20} height={20} />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {!requestingGetActivityPost && latestActivityPost && (
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "150px",
                  height: "120px",
                  border: (theme) => `3px solid ${theme.palette.border.feeds}`,
                  backgroundColor:
                    latestActivityPost && latestActivityPost.post[0].color
                      ? latestActivityPost.post[0].color
                      : "#ccc",
                  boxShadow: (theme) =>
                    `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,

                  borderRadius: "30px",
                  overflow: "hidden",
                  display: "flex",
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  padding: "20px",
                }}
              >
                {latestActivityPost.post[0].title}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
                  <AvatarProfile
                    alt={latestActivityPost.post[0].user[0].name}
                    src={latestActivityPost.post[0].user[0].avatar}
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
                    {latestActivityPost.post[0].user[0].name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          <Box>
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",

                paddingBottom: "20px",
                color: (theme) => theme.palette.text.color.active,
              }}
            >
              See All Posts
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default LatestPost;
