import { getSession, useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";
import UsersInRoomRandom from "../../../components/Chat/Room/Random/UserInRoomRandom";
import Banned from "../../../components/Dialog/Banned";
import MenuRight from "../../../components/Chat/MenuRight";
import AboutMe from "../../../components/Homepage/AboutMe";
import FindPartnerRandom from "../../../components/Homepage/FindPartnerRandom";
import Introduce from "../../../components/Homepage/Introduce";
import Setting from "../../../components/Homepage/Setting";
import Layout from "../../../components/Layout/Layout";
import SocketContext from "../../../contexts/socket";
import { Avatar, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
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
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <Introduce />
              <UsersInRoomRandom socket={socket} />
              <FindPartnerRandom socket={socket} />
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
