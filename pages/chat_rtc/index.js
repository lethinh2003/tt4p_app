import { getSession, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Introduce from "../../components/ChatCall/Introduce";
import Layout from "../../components/Layout/Layout";
export default function Home() {
  return (
    <>
      <Layout>
        <Introduce />
      </Layout>
    </>
  );
}
