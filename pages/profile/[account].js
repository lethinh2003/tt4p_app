import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import Profile from "../../components/Profile/Profile";
import SocketContext from "../../contexts/socket";
import useAuth from "../../utils/useAuth";
import MenuRight from "../../components/Profile/MenuRight";
import Link from "next/link";
const Home = () => {
  const isAuthenticated = useAuth(true);

  const router = useRouter();
  const { account } = router.query;

  return (
    <>
      <Layout>
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

              <Profile account={account} />
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
