import { Box } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import { useEffect } from "react";
import Banned from "../components/Dialog/Banned";
import AboutMe from "../components/Homepage/AboutMe";
import Feeds from "../components/Homepage/Feeds";
import Setting from "../components/Homepage/Setting";
import Layout from "../components/Layout/Layout";
import MenuRight from "../components/Layout/MenuRight";
import SuggestFriends from "../components/MenuRight/SuggestFriends";
import SidebarMobile from "../components/Layout/SidebarMobile";
import { setCookies } from "cookies-next";
import Cookies from "cookies";

const Home = () => {
  const { data: session, status } = useSession();
  console.log("render-index");
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/portal";
    }
  }, [status]);

  return (
    <>
      <Layout>
        <MenuRight />
        <Box
          sx={{
            width: "100%",
            padding: "10px 20px",
            display: { xs: "block", md: "none" },
          }}
        >
          <SidebarMobile />
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: "0px 20px",
            display: { xs: "block", md: "none" },
          }}
        >
          <SuggestFriends />
        </Box>
        <Feeds />

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
  const cookies = new Cookies(req, res);
  const session = await getSession({ req });

  if (session && session.user) {
    const token = await getToken({ req });
    if (token) {
      cookies.set("access_token", token.access_token, {
        maxAge: 90 * 24 * 60 * 60,
        httpOnly: true, // true by default
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
    }
    return {
      props: {},
    };
  } else {
    cookies.set("access_token");
    return {
      redirect: {
        permanent: false,
        destination: "/portal",
      },
      props: {},
    };
  }
};
