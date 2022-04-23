import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../redux/reducers/store";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <title>Trò chuyện 4 phương</title>
          <link
            rel="icon"
            type="image/x-icon"
            href="https://i.imgur.com/U0BdIic.png"
          />

          <meta
            name="description"
            content="Trò chuyện 4 phương, nơi bạn tìm kiếm bạn tâm sự, bạn bè, người yêu"
          />
          <meta
            name="keywords"
            content="trò chuyện 4 phương, 4 phương, trò chuyện online, tìm bạn bè online, chat online, tìm bạn 4 phương, chat, chat với người lạ, chat ẩn danh, chat online, nói chuyện với người lạ, nhắn tin, trò chuyện, người lạ, chém gió, tìm bạn mới, kết bạn"
          />
          <meta name="author" content="Thinh Le" />
          <meta property="og:title" content="Trò chuyện 4 phương" />
          <meta
            property="og:description"
            content="Trò chuyện 4 phương, nơi bạn tìm kiếm bạn tâm sự, bạn bè, người yêu"
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://i.imgur.com/742Ra2n.png" />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="720" />
        </Head>
        <Component {...pageProps}>
          <ToastContainer />
        </Component>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
