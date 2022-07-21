import { Box, Typography } from "@mui/material";
import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useContext, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import CommentPost from "../../components/Post/CommentPost";
import ContentPost from "../../components/Post/ContentPost";
import IntroducePost from "../../components/Post/IntroducePost";
import MenuRight from "../../components/Post/MenuRight";
import SocketContext from "../../contexts/socket";
import useAuth from "../../utils/useAuth";
const PostDetail = (props) => {
  const pagePostRef = useRef(null);
  const isAuthenticated = useAuth(true);
  const socket = useContext(SocketContext);
  const { dataPost: item } = props;
  const router = useRouter();

  return (
    <>
      <Layout>
        <Box
          sx={{
            padding: {
              xs: "0px",
              md: "0px 410px 0px 5px",
              lg: "0px 410px 0px 280px",
            },
          }}
        >
          <Box
            sx={{
              padding: { xs: "20px 20px 110px 20px", md: "20px" },
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
                🗒️ Post
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

                  <ContentPost socket={socket} item={item} />

                  <CommentPost
                    socket={socket}
                    item={item}
                    isAuthenticated={isAuthenticated}
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
        {item && <MenuRight item={item} />}
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
          dataPost: null,
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
