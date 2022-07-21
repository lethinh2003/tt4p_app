import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import HomePage from "../../components/Chat/HomePage";
import Banned from "../../components/Dialog/Banned";
import AboutMe from "../../components/Homepage/AboutMe";
import Setting from "../../components/Homepage/Setting";
import Layout from "../../components/Layout/Layout";
import { Avatar, Box, Typography } from "@mui/material";
import MenuRight from "../../components/Chat/MenuRight";
export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/portal";
    }
  }, [status]);
  return (
    <>
      <Layout>
        <Banned />
        <AboutMe />
        <Setting />
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
            <HomePage />
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
