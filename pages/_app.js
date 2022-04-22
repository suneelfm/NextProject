import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refreshInterval={30 * 60}>
      <Layout Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
