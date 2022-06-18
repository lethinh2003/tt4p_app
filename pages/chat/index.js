import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import HomePage from "../../components/Chat/HomePage";
import Banned from "../../components/Dialog/Banned";
import AboutMe from "../../components/Homepage/AboutMe";
import Setting from "../../components/Homepage/Setting";
import Layout from "../../components/Layout/Layout";
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
        <HomePage />
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
