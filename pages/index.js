import { Box } from "@mui/material";
import { getSession } from "next-auth/react";

import Head from "next/head";
import Banned from "../components/Dialog/Banned";
import AboutMe from "../components/Homepage/AboutMe";
import Feeds from "../components/Homepage/Feeds";
import Setting from "../components/Homepage/Setting";
import Layout from "../components/Layout/Layout";
import MenuRight from "../components/Layout/MenuRight";
import SuggestFriends from "../components/MenuRight/SuggestFriends";
import useAuth from "../utils/useAuth";

const Home = () => {
  const isAuthenticated = useAuth(true);
  const linkThumbnail = "https://i.imgur.com/WG0XIGa.png";
  const titleThumbnail = "Trang chủ | Trò chuyện bốn phương";
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
            width: "100%",
            padding: { xs: "0px 5px", md: "0px 20px" },
            display: { xs: "block", md: "none" },
          }}
        >
          <SuggestFriends />
        </Box>

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
            <Feeds isAuthenticated={isAuthenticated} />
          </Box>
        </Box>
        <MenuRight />
        <Banned />
        <AboutMe />
        <Setting />
      </Layout>
    </>
  );
};

export default Home;
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
