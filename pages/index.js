import { Box } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import Banned from "../components/Dialog/Banned";
import AboutMe from "../components/Homepage/AboutMe";
import Feeds from "../components/Homepage/Feeds";
import Setting from "../components/Homepage/Setting";
import Layout from "../components/Layout/Layout";
import MenuRight from "../components/Layout/MenuRight";
import SuggestFriends from "../components/MenuRight/SuggestFriends";
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
