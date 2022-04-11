import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <Component {...pageProps}>
        <ToastContainer />
      </Component>
    </SessionProvider>
  );
}

export default MyApp;
