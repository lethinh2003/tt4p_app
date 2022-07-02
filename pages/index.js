import { Box } from "@mui/material";
import { getSession, useSession } from "next-auth/react";

import { useEffect } from "react";
import Banned from "../components/Dialog/Banned";
import AboutMe from "../components/Homepage/AboutMe";
import Feeds from "../components/Homepage/Feeds";
import Setting from "../components/Homepage/Setting";
import Layout from "../components/Layout/Layout";
import MenuRight from "../components/Layout/MenuRight";
import SidebarMobile from "../components/Layout/SidebarMobile";
import SuggestFriends from "../components/MenuRight/SuggestFriends";

const Home = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/portal";
    }
  }, [status]);

  return (
    <>
      {status === "authenticated" && (
        <Layout>
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
            <SuggestFriends session={session} status={status} />
          </Box>

          <Box
            sx={{
              padding: { xs: "0px", md: "0px 410px 0px 280px" },
            }}
          >
            <Box
              sx={{
                padding: { xs: "20px 20px 110px 20px", md: "20px" },
              }}
            >
              <Feeds />
            </Box>
          </Box>
          <MenuRight session={session} status={status} />
          <Banned />
          <AboutMe />
          <Setting />
        </Layout>
      )}
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
