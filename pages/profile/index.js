import { Box, Typography } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import MenuRight from "../../components/Profile/MenuRight";
import useAuth from "../../utils/useAuth";

const Home = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = useAuth(true);

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/profile/${session.user.account}`);
    }
  }, [session]);

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
                🗒️ Thông tin tài khoản
              </Typography>
            </Box>
          </Box>
        </Box>
        <MenuRight />
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
