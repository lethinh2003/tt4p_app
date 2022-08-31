import { getSession, useSession } from "next-auth/react";
import { useEffect, useContext } from "react";
import Banned from "../../../components/Dialog/Banned";
import AboutMe from "../../../components/Homepage/AboutMe";
import FindPartner from "../../../components/Homepage/FindPartner";
import Introduce from "../../../components/Homepage/Introduce";
import Setting from "../../../components/Homepage/Setting";
import UsersInRoom from "../../../components/Homepage/UsersInRoom";
import Layout from "../../../components/Layout/Layout";
import HomePage from "../../../components/Chat/HomePage";
import SocketContext from "../../../contexts/socket";
import { Avatar, Box, Typography } from "@mui/material";
import MenuRight from "../../../components/Chat/MenuRight";

export default function Home() {
  const { data: session, status } = useSession();
  const socket = useContext(SocketContext);

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
            padding: { xs: "0px", md: "0px 410px 0px 280px" },
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
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <Introduce />
              <UsersInRoom socket={socket} />
              <FindPartner socket={socket} />
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
