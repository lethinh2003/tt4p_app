import { Box, Typography } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import MenuRight from "../../components/Profile/MenuRight";
import Profile from "../../components/Profile/Profile";
import SocketContext from "../../contexts/socket";
import useAuth from "../../utils/useAuth";

const Home = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = useAuth(true);
  const socket = useContext(SocketContext);

  const router = useRouter();
  const { account } = router.query;
  useEffect(() => {
    if (session) {
      if (!account) {
        router.push(`/profile/${session.user.account}`);
      }
    }
  }, [account, session]);

  return (
    <>
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
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                🗒️ Thông tin {account}
              </Typography>

              <Profile account={account} socket={socket} />
            </Box>
          </Box>
        </Box>
        <MenuRight account={account} />
      </Layout>
    </>
  );
};
export default Home;
export const getServerSideProps = async (context) => {
  const { req } = context;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/portal",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};
