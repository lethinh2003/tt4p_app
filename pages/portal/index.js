import { Box } from "@mui/material";
// import PlayerInfo from "./PlayerInfo";
import { styled } from "@mui/material/styles";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import Index from "../../components/Portal/Index";
import Layout from "../../components/Portal/Layout";
import Head from "next/head";
const Portal = (props) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);

  const linkThumbnail = "https://i.imgur.com/WmjYizq.png";
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
        <Index />
      </Layout>
    </>
  );
};
export default Portal;
export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session && session.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};
