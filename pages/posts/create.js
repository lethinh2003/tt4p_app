import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import Layout from "../../components/Layout/Layout";
import CreateNewPost from "../../components/Post/CreateNewPost";
import MenuRight from "../../components/Post/CreatePost/MenuRight";
import useAuth from "../../utils/useAuth";
const CreatePost = () => {
  const isAuthenticated = useAuth(true);

  return (
    <>
      <Layout>
        <Box
          sx={{
            padding: {
              xs: "0px",
              md: "0px 410px 0px 5px",
              lg: "0px 410px 0px 280px",
            },
          }}
        >
          <Box
            sx={{
              padding: { xs: "20px 20px 110px 20px", md: "20px" },
            }}
          >
            <Box
              sx={{
                width: "100%",

                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                📝 Create a post
              </Typography>
              {isAuthenticated && <CreateNewPost />}
            </Box>
          </Box>
        </Box>
        <MenuRight />
      </Layout>
    </>
  );
};
export default CreatePost;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && session.user) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/portal",
      },
      props: {},
    };
  }
};
