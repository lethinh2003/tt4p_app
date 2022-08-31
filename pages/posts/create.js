import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import CreateNewPost from "../../components/Post/CreateNewPost";
import MenuRight from "../../components/Post/CreatePost/MenuRight";
import useAuth from "../../utils/useAuth";
const CreatePost = () => {
  const isAuthenticated = useAuth(true);
  const linkThumbnail = "https://i.imgur.com/9OCtwl9.png";
  const titleThumbnail = "Tạo bài đăng mới | Trò chuyện bốn phương";
  return (
    <>
      <Head>
        <title> {titleThumbnail}</title>
        <meta
          name="description"
          content="Trò chuyện 4 phương, nơi bạn tìm kiếm bạn tâm sự, bạn bè, người yêu"
        />
        <meta
          name="keywords"
          content="trò chuyện 4 phương, 4 phương, trò chuyện online, tìm bạn bè online, chat online, tìm bạn 4 phương, chat, chat với người lạ, chat ẩn danh, chat online, nói chuyện với người lạ, nhắn tin, trò chuyện, người lạ, chém gió, tìm bạn mới, kết bạn"
        />

        <meta property="og:image" content={linkThumbnail} />
        <meta property="og:title" content={titleThumbnail} />
        <meta
          property="og:description"
          content="Trò chuyện 4 phương, nơi bạn tìm kiếm bạn tâm sự, bạn bè, người yêu"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={titleThumbnail} />
        <meta
          property="twitter:description"
          content="Trò chuyện 4 phương, nơi bạn tìm kiếm bạn tâm sự, bạn bè, người yêu"
        />
        <meta property="twitter:creator" content="Thinh Le" />
        <meta property="twitter:image" content={linkThumbnail} />
      </Head>
      <Layout>
        <Box
          sx={{
            padding: {
              xs: "0px",
              md: "0px 410px 110px 5px",
              lg: "0px 410px 0px 280px",
            },
            marginTop: {
              md: "60px",
              lg: "0px",
            },
          }}
        >
          <Box
            sx={{
              padding: { xs: "20px 5px 110px 5px", md: "20px" },
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
              <Box
                sx={{
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.border.dialog}`,
                  paddingBottom: "20px",
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
              </Box>
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
