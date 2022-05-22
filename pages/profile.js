import { getSession } from "next-auth/react";
import Layout from "../components/Layout/Layout";
export default function Home() {
  return (
    <>
      <Layout>
        <h1>Hello</h1>
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
