import { Box } from "@mui/material";
// import PlayerInfo from "./PlayerInfo";
import { styled } from "@mui/material/styles";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import Index from "../../components/Portal/Index";
import Layout from "../../components/Portal/Layout";

const Portal = (props) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);

  return (
    <>
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
