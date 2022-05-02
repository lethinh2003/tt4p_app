import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/react";
import FindPartner from "../components/Homepage/FindPartner";
import Introduce from "../components/Homepage/Introduce";
import UsersInRoom from "../components/Homepage/UsersInRoom";
import Setting from "../components/Homepage/Setting";
import AboutMe from "../components/Homepage/Aboutme";
import Banned from "../components/Dialog/Banned";
import { useSession } from "next-auth/react";
import Admin from "../components/Homepage/Admin";
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
        <Introduce />
        <UsersInRoom />
        <FindPartner />
        {session && session.user.role === "admin" && <Admin />}
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
