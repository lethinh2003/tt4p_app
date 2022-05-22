import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { memo, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import CommentPost from "../../components/Post/CommentPost";
import ContentPost from "../../components/Post/ContentPost";
import IntroducePost from "../../components/Post/IntroducePost";
import MenuRight from "../../components/Post/MenuRight";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import { MdOutlineArticle } from "react-icons/md";

const PostDetail = (props) => {
  const pagePostRef = useRef(null);
  const { data: session, status } = useSession();
  const { dataPost: item } = props;
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);
  return (
    <>
      <Layout ref={pagePostRef}>
        <MenuRight item={item} />
        <Box
          sx={{
            width: "100%",
            maxWidth: "calc(100% - 60px)",
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
            <MdOutlineArticle />
            Post
          </Typography>
          {item && (
            <>
              <Head>
                <title>{`${item.title} - TroChuyen4Phuong`}</title>
                <meta name="description" content={item.title} />
                <meta
                  name="keywords"
                  content={`${item.title.split(" ").join(", ")}`}
                />
                <meta
                  property="og:title"
                  content={`${item.title} - TroChuyen4Phuong`}
                />
                <meta property="og:description" content={item.title} />
              </Head>
              <IntroducePost item={item} />

              <ContentPost item={item} />
              <CommentPost item={item} />
            </>
          )}
        </Box>
      </Layout>
    </>
  );
};
export default memo(PostDetail);
export const getServerSideProps = async (context) => {
  const { params, req } = context;
  const getSlugPost = params.slug.join("/");
  const session = await getSession({ req });
  let dataPost;

  if (session && session.user) {
    try {
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/slug/`,
        {
          slug: getSlugPost,
        }
      );
      dataPost = res.data.data;
    } catch (err) {
      console.log(err);
      return {
        props: {
          dataPost: dataPost,
        },
      };
    }
    return {
      props: {
        dataPost: dataPost,
      },
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
