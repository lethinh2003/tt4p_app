import { getSession } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
export default function Home() {
  const handleScroll = () => {
    console.log("scroll");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <>
      <div
        style={{
          height: "1000px",
        }}
      >
        <h1>Hello</h1>
      </div>
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
