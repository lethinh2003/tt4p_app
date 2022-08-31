import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "../components/Layout/DefaultLayout";
import ThemeLayout from "../components/Layout/ThemeLayout";
import SocketProvider from "../contexts/SocketProvider";
import { store } from "../redux/reducers/store";
import "../styles/globals.scss";
import RefreshTokenHandler from "../utils/RefreshTokenHandler";
import { usePreserveScroll } from "../utils/usePreserveScroll.ts";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [interval, setInterval] = useState(0);
  const Layout = Component.Layout || DefaultLayout;
  usePreserveScroll();
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchInterval={interval}
    >
      <RefreshTokenHandler setInterval={setInterval} />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SocketProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
              />

              <title>Trò chuyện bốn phương</title>
              <link
                rel="icon"
                type="image/x-icon"
                href="https://i.imgur.com/U0BdIic.png"
              />

              <meta name="author" content="Thinh Le" />

              <meta property="og:locale" content="vi_VN" />
              <meta property="og:type" content="website" />

              <meta property="og:image:width" content="1280" />
              <meta property="og:image:height" content="720" />
            </Head>
            <ThemeLayout>
              <Layout>
                <Component {...pageProps}></Component>
              </Layout>
            </ThemeLayout>
          </SocketProvider>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
