import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import Banned from "../../../components/Dialog/Banned";
import AboutMe from "../../../components/Homepage/AboutMe";
import FindPartner from "../../../components/Homepage/FindPartner";
import FindPartnerRandom from "../../../components/Homepage/FindPartnerRandom";
import Introduce from "../../../components/Homepage/Introduce";
import Setting from "../../../components/Homepage/Setting";
import UsersInRoom from "../../../components/Homepage/UsersInRoom";
import UsersInRoomRandom from "../../../components/Chat/Room/Random/UserInRoomRandom";
import Layout from "../../../components/Layout/Layout";
import HomePage from "../../../components/Chat/HomePage";
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
        <UsersInRoomRandom />
        <FindPartnerRandom />
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
