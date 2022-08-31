import { Box, Typography } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect } from "react";
import MenuRight from "../../../components/Chat/MenuRight";
import UsersInRoomRandom from "../../../components/Chat/Room/Random/UserInRoomRandom";
import Banned from "../../../components/Dialog/Banned";
import AboutMe from "../../../components/Homepage/AboutMe";
import FindPartnerRandom from "../../../components/Homepage/FindPartnerRandom";
import Introduce from "../../../components/Homepage/Introduce";
import Setting from "../../../components/Homepage/Setting";
import Layout from "../../../components/Layout/Layout";
import SocketContext from "../../../contexts/socket";
export default function Home() {
  const { data: session, status } = useSession();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/portal";
    }
  }, [status]);
  const linkThumbnail = "https://i.imgur.com/JIYLRIR.png";
  const titleThumbnail = "Phòng chat random | Trò chuyện bốn phương";

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
        <Banned />
        <AboutMe />
        <Setting />
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
                  Chat Random
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  alignItems: "center",
                  backgroundColor: (theme) =>
                    theme.palette.feed.background.first,
                  padding: "10px",
                  border: (theme) => `1px solid ${theme.palette.border.dialog}`,
                  borderRadius: "5px",
                }}
              >
                <Introduce />
                <UsersInRoomRandom socket={socket} />
                <FindPartnerRandom socket={socket} />
              </Box>
            </Box>
          </Box>
        </Box>
        <MenuRight />
      </Layout>
    </>
  );
}
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
