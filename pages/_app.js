import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Layout Component={Component} {...pageProps} />;
}

export default MyApp;
