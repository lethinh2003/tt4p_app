import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/react";
import FindPartner from "../components/Homepage/FindPartner";
import Introduce from "../components/Homepage/Introduce";
import UsersInRoom from "../components/Homepage/UsersInRoom";
export default function Home() {
  return (
    <>
      <Layout>
        <Introduce />
        <UsersInRoom />
        <FindPartner />
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
